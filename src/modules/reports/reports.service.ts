import { OperationType, ReportStatus } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateReportDto } from './dtos/createReport.dto';
import { CreateScheduleDto } from './dtos/createSchedule.dto';
import { UpdateScheduleDto } from './dtos/updateSchedule.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

  createReport(
    reporterId: number,
    createReportDto: CreateReportDto,
    operationType: OperationType,
  ) {
    return this.prismaService.report.create({
      data: {
        ...createReportDto,
        reporterId,
        type: operationType,
        status: ReportStatus.PENDING,
      },
    });
  }

  findAllScheduled() {
    return this.prismaService.schedule.findMany();
  }

  schedule(schedulerId: number, createScheduleDto: CreateScheduleDto) {
    return this.prismaService.schedule.create({
      data: {
        ...createScheduleDto,
        schedulerId,
      },
    });
  }

  findReportById(id: number) {
    return this.prismaService.report.findUnique({
      where: {
        id,
      },
    });
  }

  findAllReports() {
    return this.prismaService.report.findMany();
  }

  updateSchedule(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.prismaService.schedule.update({
      where: {
        id,
      },
      data: {
        description: updateScheduleDto.description,
        frequency: updateScheduleDto.frequency,
        lastMaintenanceDate: updateScheduleDto.lastMaintenanceDate,
      },
    });
  }

  deleteSchedule(id: number) {
    return this.prismaService.schedule.delete({
      where: {
        id,
      },
    });
  }
}
