import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class TimeRangeDto {
  @ApiProperty({
    description: 'Start date for filtering statistics (ISO format)',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'End date for filtering statistics (ISO format)',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}
