import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsOptional()
  assetId?: number | null;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsNumber()
  @IsOptional()
  categoryId?: number | null;

  @IsOptional()
  @IsString()
  imageUrl?: string | null;
}
