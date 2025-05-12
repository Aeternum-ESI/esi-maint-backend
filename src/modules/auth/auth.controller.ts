import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Public } from './decorators/public.decorator';

import { User } from './decorators/user.decorator';
import { JwtPayload } from './dtos/jwtPayload';
import { GoogleUserDto } from './dtos/register.dto';
import { Response } from 'express';
import { FRONTEND_URL } from 'src/common/utils/const';
import { Role } from 'prisma/generated/client';

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
  async googleAuthCallback(@User() user: GoogleUserDto, @Res() res: Response) {
    try {
      const token = await this.authService.signIn(user);

      return res.redirect(`${FRONTEND_URL}/oauth?token=${token}`);
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
    return this.authService.findUserByEmail(User.email);
  }

  @Public()
  @Post('mocklogin')
  async mockLogin(@Body() body: { role: Role }) {
    console.log(body);
    return await this.authService.mockLogin(body.role);
  }
}
