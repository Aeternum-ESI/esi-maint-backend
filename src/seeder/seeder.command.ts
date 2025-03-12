import { Command, CommandRunner } from 'nest-commander';
import { SeederService } from './seeder.service';
import { Logger } from '@nestjs/common';

@Command({ name: 'seed', description: 'Seed database with initial data' })
export class SeederCommand extends CommandRunner {
  private readonly logger = new Logger(SeederCommand.name);

  constructor(private readonly seederService: SeederService) {
    super();
  }

  async run(): Promise<void> {
    try {
      this.logger.log('Running seed command...');
      await this.seederService.seed();
      this.logger.log('Seed command completed successfully');
      process.exit(0);
    } catch (error) {
      this.logger.error(`Seed command failed: ${error.message}`);
      process.exit(1);
    }
  }
}
