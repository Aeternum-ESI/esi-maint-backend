import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async askPromotion(id: number, role: Role) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.approvalStatus === true) {
      throw new Error(
        'You cannot repeat this operation. User is already approved',
      );
    }

    return await this.prismaService.user.update({
      where: { id },
      data: {
        role,
        approvalStatus: role == Role.STAFF ? true : false,
      },
    });
  }

  async getPromotionRequests() {
    const users = await this.prismaService.user.findMany({
      where: { approvalStatus: false, role: Role.ADMIN || Role.TECHNICIAN },
    });
    return users;
  }

  async promoteUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.approvalStatus === true) {
      throw new BadRequestException('User is already approved');
    }

    return await this.prismaService.user.update({
      where: { id },
      data: {
        approvalStatus: true,
      },
    });
  }
}
