import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsValidDateString } from 'src/common/decorators/isValidDate.decorator';

export class UpdateInterventionRequestDto {
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ enum: Priority, example: Priority.LOW })
  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @IsValidDateString()
  @IsString()
  @IsOptional()
  deadline?: string;

  @IsArray({ message: 'Assigned technicians must be an array.' })
  @ArrayUnique(
    (technician: TechnicianAssignementDto) => technician.technicianId,
    {
      message: 'Technicians must be unique by id.',
    },
  )
  @ValidateNested({ each: true })
  @Type(() => TechnicianAssignementDto)
  @IsOptional()
  assignedTo?: TechnicianAssignementDto[];
}

export class TechnicianAssignementDto {
  @IsNumber()
  technicianId: number;

  @IsNumber()
  @IsOptional()
  locationId?: number;
}
