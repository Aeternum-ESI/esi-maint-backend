import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Cron, ScheduleModule } from '@nestjs/schedule';
import { ReportsService } from '../reports/reports.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService, ReportsService],
})
export class TasksModule {}
