import { ApiProperty } from '@nestjs/swagger';
import { Priority } from 'prisma/generated/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsOptional()
  assetId?: number | null;

  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiProperty({ enum: Priority, example: Priority.LOW })
  @IsEnum(Priority)
  priority: Priority;

  @IsNumber()
  @IsOptional()
  categoryId?: number | null;

  @IsOptional()
  @IsString()
  imageUrl?: string | null;
}
