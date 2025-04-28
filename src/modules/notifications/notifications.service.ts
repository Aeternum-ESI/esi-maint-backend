import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { sendMail } from 'src/common/utils/mail';

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
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('user with id ' + userId + ' not found');
    }

    await this.prismaService.notification.create({
      data: {
        message,
        userId,
        title,
      },
    });

    if (include.email) {
      sendMail({
        to: user?.email,
        text: message,
        subject: title,
      });
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
