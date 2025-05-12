import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleUserDto } from './dtos/register.dto';
import { PrismaService } from '../prisma/prisma.service';

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
    } catch(e) {
      throw new InternalServerErrorException('Error while registering user'+ e.message);
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
