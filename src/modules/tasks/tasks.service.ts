import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { ReportsService } from '../reports/reports.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly reportsService: ReportsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async checkScheduleAndCreatePreventiveReport() {
    const scheduledTasks = await this.prismaService.schedule.findMany();

    scheduledTasks.forEach(async (scheduledTask) => {
      // compare between lastMaintenanceDate and current date
      // if the difference is more than the interval, create a new report
      const lastMaintenanceDate = new Date(scheduledTask.lastMaintenanceDate);
      const currentDate = new Date();

      const difference = currentDate.getTime() - lastMaintenanceDate.getTime();

      const days = difference / (1000 * 3600 * 24);

      if (days >= scheduledTask.frequency) {
        const { assetId, categoryId, description, schedulerId, id, priority } =
          scheduledTask;

        await this.reportsService.createReport(
          schedulerId,
          {
            assetId,
            categoryId,
            description,
            priority,
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

  @Cron(CronExpression.EVERY_12_HOURS)
  async checkTasksAndCheckDeadline() {
    const interventionRequests =
      await this.prismaService.interventionRequest.findMany({
        where: {
          status: 'IN_PROGRESS',
        },
        include: {
          assignedTo: true,
        },
      });

    interventionRequests.forEach(async (interventionRequest) => {
      const currentDate = new Date();
      const deadline = new Date(interventionRequest.deadline);

      const assignements = interventionRequest.assignedTo;

      // Check if there is 24h left before the deadline
      const timeLeft = deadline.getTime() - currentDate.getTime();
      const hoursLeft = timeLeft / (1000 * 3600);
      if (hoursLeft <= 24 && hoursLeft > 0) {
        // Notify the technicians assigned to the intervention request
        this.prismaService.interventionRequest.update({
          where: {
            id: interventionRequest.id,
          },
          data: {
            notified: true,
          },
        });
        assignements
          .filter((a) => !a.completed)
          .forEach(async (assignement) => {
            await this.notificationsService.notify({
              userId: assignement.technicianId,
              title: 'Délai de tâche',
              message: `Il vous reste moins de 24 heures pour terminer la tâche ${interventionRequest.title}.`,
              include: {
                email: true,
              },
            });
          });
      }

      // Check if deadline has passed
      if (currentDate.getTime() > deadline.getTime()) {
        // Update Status to OVERDUE
        await this.prismaService.interventionRequest.update({
          where: {
            id: interventionRequest.id,
          },
          data: {
            status: 'OVERDUE',
          },
        });

        // Notify the technicians assigned to the intervention request who haven't completed the task
        assignements
          .filter((a) => !a.completed)
          .forEach(async (assignement) => {
            await this.notificationsService.notify({
              userId: assignement.technicianId,
              title: 'Délai dépasse',
              message: `Le délai pour votre tâche ${interventionRequest.title} est dépassé.`,
              include: {
                email: true,
              },
            });
          });
      }
    });
  }
}
