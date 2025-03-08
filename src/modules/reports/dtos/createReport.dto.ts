import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  description: string;
  @IsNumber()
  @IsOptional()
  assetId?: number;
  @IsNumber()
  @IsOptional()
  categoryId?: number;
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
