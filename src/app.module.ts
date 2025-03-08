import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { CategoriesModule } from './modules/categories/categories.module';
import { PrismaModule } from 'nestjs-prisma';
import { ProfessionsModule } from './modules/professions/professions.module';
import { AssetsModule } from './modules/assets/assets.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          omit: {
            user: {
              password: true,
              updatedAt: true,
              createdAt: true,
            },
          },
        },
      },
    }),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoriesModule,
    ProfessionsModule,
    AssetsModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
