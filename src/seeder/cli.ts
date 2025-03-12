import { CommandFactory } from 'nest-commander';
import { SeederModule } from './seeder.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('SeedCLI');
  try {
    logger.log('Starting seed CLI...');
    await CommandFactory.run(SeederModule);
    logger.log('Seed CLI completed.');
  } catch (error) {
    console.log(error);
    logger.error(`Failed to run seed CLI: ${error.message}`);
    logger.error(error.stack);
    process.exit(1);
  }
}

bootstrap();
