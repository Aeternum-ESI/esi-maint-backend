import { Injectable, NotFoundException } from '@nestjs/common';
import { ApprovalStatus, Role } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UpdateTechnicianDataDto } from './dtos/updateTechnicianData.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TechniciansService {
  constructor(private readonly prismaService: PrismaService) {}
  async getTechnicianById(id: number) {
    const technician = await this.prismaService.user.findUnique({
      where: { id, role: Role.TECHNICIAN },
      include: {
        technicianData: {
          include: {
            availabilities: true,
            profession: true,
          },
        },
      },
    });
    if (!technician) {
      throw new NotFoundException(`Technician with id ${id} not found`);
    }
    return technician;
  }
  getTechnicians() {
    return this.prismaService.user.findMany({
      where: {
        role: Role.TECHNICIAN,
        approvalStatus: ApprovalStatus.VALIDATED,
      },
      include: {
        technicianData: {
          include: {
            availabilities: true,
            profession: true,
          },
        },
      },
    });
  }

  async updateTechnicianData(
    id: number,
    updateTechnicianDataDto: UpdateTechnicianDataDto,
  ) {
    await this.getTechnicianById(id);

    // Use proper Prisma typing for update data
    const updateData: Prisma.TechnicianUpdateInput = {};

    // Only update professionId if provided
    if (updateTechnicianDataDto.professionId) {
      updateData.profession = {
        connect: { id: updateTechnicianDataDto.professionId },
      };
    }

    // Only update availabilities if provided
    if (updateTechnicianDataDto.availabilities) {
      updateData.availabilities = {
        deleteMany: {},
        create: updateTechnicianDataDto.availabilities.map((availability) => ({
          day: availability.day,
          startHour: availability.startHour,
          endHour: availability.endHour,
        })),
      };
    }

    return this.prismaService.technician.update({
      where: { userId: id },
      data: updateData,
    });
  }
}
