import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { PrismaService } from '../prisma/prisma.service';
import { TechniciansService } from '../users/technicians/technicians.service';
import { CompleteInterventionRequestDto } from './dto/completeInterventionRequest.dto';
import { CreateInterventionRequestDto } from './dto/createInterventionRequest.dto';
import { UpdateInterventionRequestDto } from './dto/updateInterventionRequest.dto';

@Injectable()
export class InterventionRequestsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly techniciansService: TechniciansService,
    private readonly assetsService: AssetsService,
  ) {}

  getAllInterventionRequests() {
    return this.prismaService.interventionRequest.findMany({
      include: {
        report: true,
        assignedTo: {
          include: {
            location: true,
            technician: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
  }

  async getInterventionRequestById(id: number) {
    const interventionRequest =
      await this.prismaService.interventionRequest.findUnique({
        where: {
          id: id,
        },
        include: {
          report: true,
          assignedTo: {
            include: {
              location: true,
              technician: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });

    if (!interventionRequest) {
      throw new NotFoundException('Intervention request not found.');
    }
    return interventionRequest;
  }

  async getInterventionRequestByUserId(userId: number) {
    const interventionRequests =
      await this.prismaService.interventionRequest.findMany({
        where: {
          assignedTo: {
            some: {
              technicianId: userId,
              completed: false,
            },
          },
        },
        include: {
          report: true,
          assignedTo: {
            include: {
              location: true,
              technician: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });

    // Remove the assignedTo field from the response and add the location field
    if (interventionRequests.length === 0) {
      return [];
    }

    return interventionRequests.map((request) => {
      const { assignedTo, ...requestWithoutAssigned } = request;

      const assignements = request.assignedTo;
      // Extract location and technician information from assignedTo
      const techniciantAssignement = assignements.find((assignment) => {
        return assignment.technicianId === userId;
      });

      return {
        ...requestWithoutAssigned,
        location: techniciantAssignement?.location,
      };
    });
  }

  async createInterventionRequest(
    creatorId: number,
    createInterventionRequestDto: CreateInterventionRequestDto,
  ) {

    const { assignedTo, deadline, reportId, title } =
      createInterventionRequestDto;

    // Move validations outside of transaction
    const report = await this.prismaService.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      throw new BadRequestException('Report does not exist with that id.');
    }

    if (report.status !== 'PENDING') {
      throw new BadRequestException(
        'Intervention request can only be created for pending reports.',
      );
    }

    if (!assignedTo || assignedTo.length === 0) {
      throw new BadRequestException(
        'Intervention request must have at least one technician assigned.',
      );
    }

    // Pre-validate technicians and locations outside transaction
    await Promise.all(
      assignedTo.map(async (assignment) => {
        await this.techniciansService.getTechnicianById(
          assignment.technicianId,
        );
        if (assignment.locationId) {
          await this.assetsService.getLocationById(assignment.locationId);
        }
      }),
    );

    // Use regular Prisma calls instead of a transaction
    // 1. Create the intervention request
    const newInterventionRequest =
      await this.prismaService.interventionRequest.create({
        data: {
          status: 'IN_PROGRESS',
          createdBy: creatorId,
          reportId: reportId,
          title: title,
          deadline: deadline,
        },
        include: {
          report: true,
        },
      });

    // 2. Create technician assignments
    const technicianAssignments = await Promise.all(
      assignedTo.map((assignment) =>
        this.prismaService.technicianAssignement.create({
          data: {
            technicianId: assignment.technicianId,
            interventionRequestId: newInterventionRequest.id,
            locationId: assignment.locationId,
          },
        }),
      ),
    );

    // 3. Update the report status to ASSIGNED
    await this.prismaService.report.update({
      where: { id: reportId },
      data: { status: 'ASSIGNED' },
    });

    // 4. Update the asset status if the report is corrective
    if (report.type === 'CORRECTIVE' && report.assetId) {
      await this.prismaService.asset.update({
        where: { id: report.assetId },
        data: { status: 'UNDER_MAINTENANCE' },
      });
    }

    // 5. Return the intervention request with its assignments
    return {
      ...newInterventionRequest,
      technicianAssignments,
    };
  }

  async completeInterventionRequest(
    TechnicianId: number,
    id: number,
    completeInterventionRequestDto: CompleteInterventionRequestDto,
  ) {
    const interventionRequest = await this.getInterventionRequestById(id);

    //verify if the technician is assigned to the intervention request
    const technicianAssignment =
      await this.prismaService.technicianAssignement.findFirst({
        where: {
          interventionRequestId: id,
          technicianId: TechnicianId,
        },
      });

    if (!technicianAssignment) {
      throw new BadRequestException(
        'Technician is not assigned to the intervention request.',
      );
    }

    if (interventionRequest.status === 'COMPLETED') {
      throw new BadRequestException(
        'Intervention request is already completed.',
      );
    }

    if (technicianAssignment.completed) {
      throw new BadRequestException(
        'Technician assignment is already completed.',
      );
    }

    await this.prismaService.$transaction(async (prisma) => {
      // 1. Update the technician assignment to COMPLETED
      await prisma.technicianAssignement.update({
        where: {
          id: technicianAssignment.id,
        },
        data: {
          completed: true,
        },
      });

      const interventionRequestAssignments =
        await prisma.technicianAssignement.findMany({
          where: {
            interventionRequestId: id,
            completed: false,
          },
        });

      // 2. Create the intervention request completion
      await prisma.interventions.create({
        data: {
          description: completeInterventionRequestDto.description,
          interventionRequestId: id,
          technicianId: TechnicianId,
        },
      });

      // 3. Update the intervention request and report status to COMPLETED if all assignments are completed
      if (interventionRequestAssignments.length === 0) {
        await prisma.interventionRequest.update({
          where: {
            id: id,
          },
          data: {
            status: 'COMPLETED',
          },
        });

        await prisma.report.update({
          where: {
            id: interventionRequest.reportId,
          },
          data: {
            status: 'TREATED',
          },
        });

        // 4. Update the asset status to OPERATIONAL if the report is corrective
        if (
          interventionRequest.report.type === 'CORRECTIVE' &&
          interventionRequest.report.assetId
        ) {
          await prisma.asset.update({
            where: {
              id: interventionRequest.report.assetId,
            },
            data: {
              status: 'OPERATIONAL',
            },
          });
        }
      }
    });
  }

  async updateInterventionRequest(
    interventionRequestId: number,
    updateInterventionRequestDto: UpdateInterventionRequestDto,
  ) {
    const interventionRequest = await this.getInterventionRequestById(
      interventionRequestId,
    );

    // Check if the intervention request is already completed
    if (interventionRequest.status === 'COMPLETED') {
      throw new BadRequestException(
        'Intervention request is already completed and cannot be updated.',
      );
    }

    const { title, priority, deadline, assignedTo } =
      updateInterventionRequestDto;

    // Use transaction to ensure atomicity
    this.prismaService.$transaction(async (prisma) => {
      // 1. Update the intervention request
      await prisma.interventionRequest.update({
        where: {
          id: interventionRequestId,
        },
        data: {
          title: title,
          deadline: deadline,
        },
      });

      // 2. Update technician assignments
      if (assignedTo) {
        // 2.1. Delete all existing assignments
        await prisma.technicianAssignement.deleteMany({
          where: {
            interventionRequestId: interventionRequestId,
          },
        });

        // 2.2. Create new assignments
        await Promise.all(
          assignedTo.map(async (assignment) => {
            await this.techniciansService.getTechnicianById(
              assignment.technicianId,
            );

            // Check if location exists if provided
            if (assignment.locationId) {
              await this.assetsService.getLocationById(assignment.locationId);
            }

            await prisma.technicianAssignement.create({
              data: {
                technicianId: assignment.technicianId,
                interventionRequestId: interventionRequestId,
                locationId: assignment.locationId,
              },
            });
          }),
        );
      }
    });
  }

  async deleteInterventionRequest(interventionRequestId: number) {
    const interventionRequest = await this.getInterventionRequestById(
      interventionRequestId,
    );

    // Check if the intervention request is already completed
    if (interventionRequest.status === 'COMPLETED') {
      throw new BadRequestException(
        'Intervention request is already completed and cannot be deleted.',
      );
    }

    // Use transaction to ensure atomicity
    this.prismaService.$transaction(async (prisma) => {
      // 1. Delete all technician assignments
      await prisma.technicianAssignement.deleteMany({
        where: {
          interventionRequestId: interventionRequestId,
        },
      });

      // 2. Delete the intervention request
      await prisma.interventionRequest.delete({
        where: {
          id: interventionRequestId,
        },
      });

      // 3. Update the report status to PENDING
      await prisma.report.update({
        where: {
          id: interventionRequest.reportId,
        },
        data: {
          status: 'PENDING',
        },
      });
    });
  }
}
