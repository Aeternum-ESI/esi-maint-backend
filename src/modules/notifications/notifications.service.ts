import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

interface Notification {
  userId: number;
  title: string;
  message: string;
  include?: {
    email?: boolean;
  };
}

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async notify({
    userId,
    title,
    message,
    include = { email: false },
  }: Notification) {
    await this.prismaService.notification.create({
      data: {
        message,
        userId,
        title,
      },
    });

    if (include.email) {
    }
  }

  async readAllNotifications(userId: number) {
    return await this.prismaService.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });
  }

  async getNotifications(id: number) {
    return await this.prismaService.notification.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async clearNotifications(userId: number) {
    return this.prismaService.notification.deleteMany({
      where: { userId },
    });
  }
}
