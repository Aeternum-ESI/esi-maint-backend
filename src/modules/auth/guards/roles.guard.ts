import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApprovalStatus, Role } from 'prisma/generated/client';
import { ROLES_KEY } from 'src/modules/auth/decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // Check if the route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If route is public, allow access without authentication
    if (isPublic) {
      return true;
    }

    // If no roles are required, still require authentication but no specific role
    if (!requiredRoles || requiredRoles.length === 0) {
      const { user } = context.switchToHttp().getRequest();
      if (!user) {
        throw new UnauthorizedException('Authentication required');
      }
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Ensure user exists (JWT authentication must happen before this guard)
    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    // Fetch complete user data from database to get the role
    const userData = await this.prismaService.user.findUnique({
      where: { id: user.id },
    });

    if (!userData) {
      throw new ForbiddenException('User not found');
    }

    // Check if user has the required role (admin, technician, or user)
    return (
      requiredRoles.some((role) => userData.role === role) &&
      userData.approvalStatus === ApprovalStatus.VALIDATED
    );
  }
}
