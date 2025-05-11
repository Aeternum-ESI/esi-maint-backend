import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { AssetsModule } from '../assets/assets.module';
import { SeederController } from './seeder.controller';

@Module({
  imports: [AssetsModule],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
