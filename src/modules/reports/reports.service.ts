import { OperationType, ReportStatus } from 'prisma/generated/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dtos/createReport.dto';
import { CreateScheduleDto } from './dtos/createSchedule.dto';
import { UpdateScheduleDto } from './dtos/updateSchedule.dto';
import { AssetsService } from '../assets/assets.service';
import { CategoriesService } from '../categories/categories.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly assetsService: AssetsService,
    private readonly categoryService: CategoriesService,
    private readonly notificationsService: NotificationsService,
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

    const admins = await this.prismaService.user.findMany({
      where: {
        role: 'ADMIN',
        approvalStatus : "VALIDATED"
      },
    });

    for (const admin of admins) {
      await this.notificationsService.notify({
        userId: admin.id,
        message: `New report created by ${reporterId}`,
        title: 'New Report',
      });
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

  async cancelReport(id: number) {
    await this.prismaService.report.update({
      where: {
        id,
      },
      data: {
        status: 'CANCELED',
      },
    });

    return await this.prismaService.interventionRequest.deleteMany({
      where: {
        reportId: id,
      },
    });
  }

  findAllScheduled() {
    return this.prismaService.schedule.findMany({
      include: {
        scheduler: true,
        asset: true,
      },
    });
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
      include: {
        reporter: true,
        asset: true,
        category: true,

        interventionRequests: {
          include: {
            assignedTo: {
              include: {
                technician: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            report: true,
            creator: true,
            Interventions: true,
          },
        },
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found.');
    }
    return report;
  }

  findAllReports() {
    return this.prismaService.report.findMany({
      include: {
        reporter: true,
        asset: true,
        category: true,
        interventionRequests: {
          include: {
            assignedTo: {
              include: {
                technician: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            report: true,
            creator: true,
            Interventions: true,
          },
        },
      },
    });
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
