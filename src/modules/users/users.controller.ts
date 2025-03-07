import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { User } from './entities/user.entity';
import { AskPromotionDto } from './dtos/askPromotion.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/askpromotion')
  askPromotion(
    @Body() askPromotionDto: AskPromotionDto,
    @Req() req: { user: User },
  ) {
    return this.usersService.askPromotion(req.user.id, askPromotionDto.role);
  }

  @Get('/promotionrequests')
  getPromotionRequests() {
    return this.usersService.getPromotionRequests();
  }

  @Post('/:id/promote')
  promoteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.promoteUser(id);
  }
}
