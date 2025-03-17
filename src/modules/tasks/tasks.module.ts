import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportsService } from '../reports/reports.service';
import { AssetsModule } from '../assets/assets.module';
import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [ScheduleModule.forRoot(), AssetsModule],
  providers: [TasksService, ReportsService, CategoriesService],
})
export class TasksModule {}
