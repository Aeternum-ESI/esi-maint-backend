import { Injectable, NotFoundException } from '@nestjs/common';
import { ApprovalStatus, Role } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UpdateTechnicianDataDto } from './dtos/updateTechnicianData.dto';

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
    const technician = await this.getTechnicianById(id);
    return this.prismaService.technician.update({
      where: { userId: id },
      data: {
        professionId: updateTechnicianDataDto.professionId,
        availabilities: {
          deleteMany: {},
          create: updateTechnicianDataDto.availabilities?.map(
            (availability) => ({
              day: availability.day,
              startHour: availability.startHour,
              endHour: availability.endHour,
            }),
          ),
        },
      },
    });
  }
}
