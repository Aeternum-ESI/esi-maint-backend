import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class AskPromotionDto {
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}
