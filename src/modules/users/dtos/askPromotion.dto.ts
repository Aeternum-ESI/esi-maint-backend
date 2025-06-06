import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'prisma/generated/client';
import { IsEnum } from 'class-validator';

export class RoleDto {
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}
