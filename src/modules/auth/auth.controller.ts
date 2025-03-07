import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Request, Response } from 'express';
import { GoogleUserDto } from './dtos/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google')
  async auth() {}

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.authService.signIn(req.user as GoogleUserDto);

      res.cookie('access_token', token, {
        maxAge: 604800000, // 1 semaine
        sameSite: 'lax',
        secure: false,
      });
      // redirect  to the frontend
      return res.redirect('http://localhost:3000/auth/me');
    } catch (error) {
      this.logger.error('Error during Google authentication', error);
      throw new HttpException(
        'Authentification Failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('me')
  async me(@Req() req: Request) {
    return req.user;
  }
}
