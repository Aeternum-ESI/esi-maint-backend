import { Module } from '@nestjs/common';
import { TechniciansModule } from '../users/technicians/technicians.module';
import { InterventionRequestsController } from './intervention-requests.controller';
import { InterventionRequestsService } from './intervention-requests.service';
import { AssetsModule } from '../assets/assets.module';

@Module({
  providers: [InterventionRequestsService],
  controllers: [InterventionRequestsController],
  exports: [InterventionRequestsService],
  imports: [TechniciansModule, AssetsModule],
})
export class InterventionRequestsModule {}
