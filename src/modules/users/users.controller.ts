import {
  Body,
  Controller,
  Delete,
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
import { NotificationsService } from '../notifications/notifications.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get('clearUsers')
  delUsers() {
    return this.usersService.delUsers();
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Delete('notifications')
  deleteNotifications(@User() user: JwtPayload) {
    return this.notificationsService.clearNotifications(user.id);
  }

  @Post('/askpromotion')
  async askPromotion(
    @Body() askPromotionDto: RoleDto,
    @User() User: JwtPayload,
  ) {
    const user = await this.usersService.askPromotion(
      User.id,
      askPromotionDto.role,
    );

    await this.notificationsService.notify({
      userId: user.id,
      title: 'Demande de rôle',
      message: 'Votre demande de rôle est en cours de traitement',
      include: {
        email: true,
      },
    });

    return 'The promotion request has been taken into account.';
  }

  @Get('/promotionrequests')
  getPromotionRequests() {
    return this.usersService.getPromotionRequests();
  }

  @Post('/readnotifications')
  readNotifications(@User() user: JwtPayload) {
    return this.notificationsService.readAllNotifications(user.id);
  }

  @Get('notifications')
  getNotifications(@User() user: JwtPayload) {
    console.log(user);
    return this.notificationsService.getNotifications(user.id);
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Post('/:id/validate')
  async promoteUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() validatePromotionDto: ValidatePromotionDto,
  ) {
    const user = await this.usersService.validatePromotionRequest(
      id,
      validatePromotionDto.isValidated,
    );

    await this.notificationsService.notify({
      userId: id,
      title: 'Validation de rôle',
      message: validatePromotionDto.isValidated
        ? `Cher(e) ${user.name}, votre demande de rôle a été acceptée.`
        : `Cher(e) ${user.name}, votre demande de rôle a été refusée. Si vous pensez que cela est une erreur veuillez vous rapprocher de l'administration.`,
      include: {
        email: true,
      },
    });

    return `Promotion request for ${user.name} has been accepted`;
  }

  @Post('/:id/setrole')
  async setRoleToUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() setRoleDto: RoleDto,
  ) {
    const user = await this.usersService.setRoleToUser(id, setRoleDto.role);
    await this.notificationsService.notify({
      userId: id,
      title: 'Changement de rôle',
      message: `Votre rôle a été modifié à ${setRoleDto.role}`,
    });
    return `Role ${setRoleDto.role} set for ${user.name}`;
  }
}
