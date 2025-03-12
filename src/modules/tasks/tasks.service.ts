import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'nestjs-prisma';
import { ReportsService } from '../reports/reports.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly reportsService: ReportsService,
  ) {}
  @Cron(CronExpression.EVERY_5_SECONDS)
  async checkSchedule() {
    const scheduledTasks = await this.prismaService.schedule.findMany();

    scheduledTasks.forEach(async (scheduledTask) => {
      // compare between lastMaintenanceDate and current date
      // if the difference is more than the interval, create a new report
      const lastMaintenanceDate = new Date(scheduledTask.lastMaintenanceDate);
      const currentDate = new Date();

      const difference = currentDate.getTime() - lastMaintenanceDate.getTime();

      const days = difference / (1000 * 3600 * 24);

      console.log({
        days,
        difference,
        currentDate,
        lastMaintenanceDate,
      });

      if (days >= scheduledTask.frequency) {
        const { assetId, categoryId, description, schedulerId, id } =
          scheduledTask;

        await this.reportsService.createReport(
          schedulerId,
          {
            assetId,
            categoryId,
            description,
          },
          'PREVENTIVE',
        );

        await this.prismaService.schedule.update({
          where: {
            id,
          },
          data: {
            lastMaintenanceDate: new Date().toISOString().split('T')[0],
          },
        });
      }
    });
  }
}
