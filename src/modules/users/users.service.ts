import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApprovalStatus, Role } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    return await this.prismaService.user.findMany();
  }

  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async askPromotion(id: number, role: Role) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.approvalStatus === ApprovalStatus.VALIDATED) {
      throw new BadRequestException(
        'You cannot repeat this operation. User is already validated',
      );
    }

    if (user.approvalStatus === ApprovalStatus.PENDING) {
      throw new BadRequestException(
        'You cannot repeat this operation. Request is pending',
      );
    }

    return await this.prismaService.user.update({
      where: { id },
      data: {
        role,
        approvalStatus:
          role === Role.STAFF
            ? ApprovalStatus.VALIDATED
            : ApprovalStatus.PENDING,
      },
    });
  }

  async getPromotionRequests() {
    const users = await this.prismaService.user.findMany({
      where: { approvalStatus: ApprovalStatus.PENDING },
    });
    return users;
  }

  async validatePromotionRequest(id: number, isValidated: boolean) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.approvalStatus === ApprovalStatus.VALIDATED) {
      throw new BadRequestException('User is already approved');
    }

    // If not validated, demote user to staff
    if (!isValidated) {
      return this.setRoleToUser(id, Role.STAFF);
    }

    // If validated, promote user to the requested role
    return this.setRoleToUser(id, user.role);
  }

  async setRoleToUser(id: number, role: Role) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.role === role) {
      throw new BadRequestException(
        `User has with id ${id} already the role ${role}`,
      );
    }

    // If the role is technician, create a technician entity
    if (role === Role.TECHNICIAN) {
      await this.prismaService.technician.create({
        data: {
          userId: id,
        },
      });
    }

    // If the user is a technician, delete the technician entity
    if (user.role === Role.TECHNICIAN) {
      await this.prismaService.technician.delete({
        where: {
          userId: id,
        },
      });
    }

    return this.prismaService.user.update({
      where: { id },
      data: { role, approvalStatus: ApprovalStatus.VALIDATED },
    });
  }
}
