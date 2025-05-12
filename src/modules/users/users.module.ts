import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TechniciansModule } from './technicians/technicians.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TechniciansModule],
  exports: [UsersService],
})
export class UsersModule {}
