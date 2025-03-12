import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AssetsModule } from '../modules/assets/assets.module';
import { CategoriesModule } from '../modules/categories/categories.module';
import { ProfessionsModule } from '../modules/professions/professions.module';
import { SeederCommand } from './seeder.command';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: ['error', 'warn'],
        },
      },
    }),
    CategoriesModule,
    ProfessionsModule,
    AssetsModule,
  ],
  providers: [SeederService, SeederCommand],
  exports: [SeederService],
})
export class SeederModule {}
