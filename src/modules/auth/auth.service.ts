import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleUserDto } from './dtos/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from 'prisma/generated/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.signAsync(payload);
  }

  async signIn(user: GoogleUserDto) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    try {
      const userExists = await this.findUserByEmail(user.email);

      if (!userExists) {
        return this.registerUser(user);
      }

      return await this.generateJwt({
        id: userExists.id,
        email: userExists.email,
        name: userExists.name,
      });
    } catch (e) {
      throw new InternalServerErrorException('Error while Signing In', e);
    }
  }

  async registerUser(user: GoogleUserDto) {
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          email: user.email,
          name: user.fullName,
          password: '',
          avatarUrl: user.picture,
        },
      });

      return this.generateJwt({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (e) {
      throw new InternalServerErrorException(
        'Error while registering user' + e.message,
      );
    }
  }

  async findUserByEmail(email) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async mockLogin(role: Role) {
    if (role === 'ADMIN') {
      const response  = await this.signIn({
        email: 'admin@esi.dz',
        fullName: 'Admin User',
        picture: '',
        provider: 'mock',
        providerId: 0,
      });
      await this.prismaService.user.update({
        where: { email: 'admin@esi.dz' },
        data: { role: 'ADMIN' , approvalStatus : 'VALIDATED'},
      });

      return response;
    }

    if (role === 'TECHNICIAN') {
      const users = await this.prismaService.user.findMany({
        where: {
          role: 'TECHNICIAN',
          approvalStatus: 'VALIDATED',
        },
      });

      if (users.length === 0) {
        return this.signIn({
          email: 'technician@esi.dz',
          fullName: 'Technician User',
          picture: '',
          provider: 'mock',
          providerId: 0,
        });
      }

      return this.generateJwt({
        id: users[0].id,
        email: users[0].email,
        name: users[0].name,
      });
    }
  }
}
