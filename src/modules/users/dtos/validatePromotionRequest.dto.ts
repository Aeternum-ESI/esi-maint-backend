import { IsBoolean } from 'class-validator';

export class ValidatePromotionDto {
  @IsBoolean()
  isValidated: boolean;
}
