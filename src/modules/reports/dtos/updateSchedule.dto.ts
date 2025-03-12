import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, Matches } from 'class-validator';
import { IsValidDateString } from 'src/common/decorators/isValidDate.decorator';

export class UpdateScheduleDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  frequency?: number;

  //default value is the current date if not provided, validate if it is a valid date in YYYY-MM-DD format
  @Transform(({ value }) => value ?? new Date().toISOString().split('T')[0])
  @ApiProperty({ example: '2025-09-01' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'lastMaintenanceDate must be in the format YYYY-MM-DD',
  })
  @IsValidDateString()
  @IsOptional()
  lastMaintenanceDate: string;
}
