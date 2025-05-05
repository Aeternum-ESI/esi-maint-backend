import { ApiProperty } from '@nestjs/swagger';
import { AssetType } from 'prisma/generated/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  name: string;
  @IsString()
  inventoryCode: string;
  @IsNumber()
  @IsOptional()
  locationId?: number;
  @IsOptional()
  @IsNumber()
  categoryId?: number;
  @IsEnum(AssetType)
  @ApiProperty({ enum: AssetType })
  type: AssetType;
  @IsString()
  @IsOptional()
  image?: string;
}
