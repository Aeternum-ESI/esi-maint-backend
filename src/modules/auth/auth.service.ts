import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleUserDto } from './dtos/register.dto';

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
        sub: userExists.id,
        email: userExists.email,
        role: userExists.role,
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
        sub: newUser.id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException('Error while registering user');
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
}
