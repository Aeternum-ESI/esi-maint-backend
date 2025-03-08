import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Response } from 'express';
import { GoogleUserDto } from './dtos/register.dto';
import { Public } from './decorators/public.decorator';

import { User } from './decorators/user.decorator';
import { JwtPayload } from './dtos/jwtPayload';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

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
  async me(@User() User: JwtPayload) {
    return User;
  }
}
