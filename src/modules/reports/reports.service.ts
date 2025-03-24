import { OperationType, ReportStatus } from '@prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateReportDto } from './dtos/createReport.dto';
import { CreateScheduleDto } from './dtos/createSchedule.dto';
import { UpdateScheduleDto } from './dtos/updateSchedule.dto';
import { AssetsService } from '../assets/assets.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly assetsService: AssetsService,
    private readonly categoryService: CategoriesService,
  ) {}

  async createReport(
    reporterId: number,
    createReportDto: CreateReportDto,
    operationType: OperationType,
  ) {
    // Verify Existence of category and asset
    if (createReportDto.assetId) {
      await this.assetsService.findOne(createReportDto.assetId);
    }

    if (createReportDto.categoryId) {
      await this.categoryService.getCategoryById(createReportDto.categoryId);
    }

    return this.prismaService.report.create({
      data: {
        ...createReportDto,
        reporterId,
        type: operationType,
        status: ReportStatus.PENDING,
      },
    });
  }

  cancelReport(id: number) {
    return this.prismaService.report.update({
      where: {
        id,
      },
      data: {
        status: 'CANCELED',
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

  async findReportById(id: number) {
    const report = await this.prismaService.report.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found.');
    }
    return report;
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
