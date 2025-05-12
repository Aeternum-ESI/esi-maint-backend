import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { AssetsModule } from '../assets/assets.module';
import { SeederController } from './seeder.controller';
import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { InterventionRequestsModule } from '../intervention-requests/intervention-requests.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfessionsModule } from '../professions/professions.module';
import { ReportsModule } from '../reports/reports.module';
import { StatsModule } from '../stats/stats.module';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';
import { TechniciansModule } from '../users/technicians/technicians.module';

@Module({
  imports: [
    AssetsModule,
    AuthModule,
    CategoriesModule,
    UsersModule,
    TechniciansModule,
    ProfessionsModule,
    ReportsModule,
    InterventionRequestsModule,
    // NotificationsModule,
    // PrismaModule,
    // StatsModule,
    // TasksModule,
  ],
  providers: [SeederService],
  controllers: [SeederController],

})
export class SeederModule {}
