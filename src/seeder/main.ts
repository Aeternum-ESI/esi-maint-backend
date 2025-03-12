import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

const logger = new Logger('SeederMain');

async function bootstrap() {
  try {
    logger.log('Creating application...');
    const app = await NestFactory.create(SeederModule);
    logger.log('Application created, getting seeder service...');

    const seederService = app.get(SeederService);
    logger.log('Starting seed process...');

    await seederService.seed();
    logger.log('Seed completed successfully.');

    await app.close();
    process.exit(0);
  } catch (error) {
    logger.error(`Failed to seed database: ${error.message}`);
    logger.error(error.stack);
    process.exit(1);
  }
}

bootstrap();
