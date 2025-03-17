import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { AssetsModule } from '../assets/assets.module';
import { CategoriesModule } from '../categories/categories.module';
import { CategoriesService } from '../categories/categories.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, CategoriesService],
  imports: [AssetsModule],
})
export class ReportsModule {}
