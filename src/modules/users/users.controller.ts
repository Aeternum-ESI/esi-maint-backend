import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RoleDto } from './dtos/askPromotion.dto';
import { ValidatePromotionDto } from './dtos/validatePromotionRequest.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // Reset necessary roles for this endpoint
  @Roles()
  @Post('/askpromotion')
  askPromotion(@Body() askPromotionDto: RoleDto, @Req() req: { user: User }) {
    return this.usersService.askPromotion(req.user.id, askPromotionDto.role);
  }

  @Get('/promotionrequests')
  getPromotionRequests() {
    return this.usersService.getPromotionRequests();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Post('/:id/validate')
  promoteUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() validatePromotionDto: ValidatePromotionDto,
  ) {
    return this.usersService.validatePromotionRequest(
      id,
      validatePromotionDto.isValidated,
    );
  }

  @Post('/:id/setrole')
  setRoleToUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() setRoleDto: RoleDto,
  ) {
    return this.usersService.setRoleToUser(id, setRoleDto.role);
  }
}
