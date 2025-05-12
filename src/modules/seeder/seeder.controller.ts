import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { SeederService } from './seeder.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  @Public()
  async seedPrompt() {
    return {
      message:
        'WARNING: This will clear all data in the database and replace it with seed data.',
      instructions: 'To confirm, please visit /seeder/confirm?key=confirm',
    };
  }

  @Get('confirm')
  @Public()
 
  async seedDatabase(@Query('key') confirmationKey: string) {
    if (confirmationKey !== 'confirm') {
      throw new HttpException(
        'Confirmation key required. Please use ?key=confirm to proceed.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.seederService.seedDatabase().catch((error) => {
      console.error('Error seeding database:', error);
      throw new HttpException(
        'Error seeding database. Please check the server logs for more details.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    return {
      message: 'Database seeded successfully.',
    };
  }
}
