import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleDto } from './dtos/askPromotion.dto';
import { ValidatePromotionDto } from './dtos/validatePromotionRequest.dto';
import { JwtPayload } from '../auth/dtos/jwtPayload';
import { User } from '../auth/decorators/user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // Reset necessary roles for this endpoint
  @Post('/askpromotion')
  askPromotion(@Body() askPromotionDto: RoleDto, @User() User: JwtPayload) {
    return this.usersService.askPromotion(User.id, askPromotionDto.role);
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

  @Roles()
  @Post('/:id/setrole')
  setRoleToUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() setRoleDto: RoleDto,
  ) {
    return this.usersService.setRoleToUser(id, setRoleDto.role);
  }
}
