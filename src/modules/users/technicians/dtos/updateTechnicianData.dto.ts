import { Day } from '@prisma/client';
import {
  IsOptional,
  IsNumber,
  IsEnum,
  IsArray,
  ValidateNested,
  Min,
  Max,
  ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TechnicianAvailabilityDto {
  @IsEnum(Day, { message: 'Day must be a valid enum value.' })
  @ApiProperty({ enum: Day, enumName: 'Day' })
  day: Day;

  @IsNumber({}, { message: 'startHour must be a number.' })
  @Min(0, { message: 'startHour cannot be less than 0.' })
  @Max(23, { message: 'startHour cannot be greater than 23.' })
  @ApiProperty({ example: 8 })
  startHour: number;

  @IsNumber({}, { message: 'endHour must be a number.' })
  @Min(0, { message: 'endHour cannot be less than 0.' })
  @Max(23, { message: 'endHour cannot be greater than 23.' })
  @ApiProperty({ example: 17 })
  endHour: number;
}

export class UpdateTechnicianDataDto {
  @IsOptional()
  @IsNumber({}, { message: 'professionId must be a number.' })
  professionId?: number;

  @IsOptional()
  @IsArray({ message: 'availabilities must be an array.' })
  @ArrayUnique((availability: TechnicianAvailabilityDto) => availability.day, {
    message: 'availabilities must be unique by day.',
  })
  @ValidateNested({ each: true })
  @Type(() => TechnicianAvailabilityDto)
  availabilities?: TechnicianAvailabilityDto[];
}
