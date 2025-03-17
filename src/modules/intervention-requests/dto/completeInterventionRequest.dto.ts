import { IsNotEmpty, IsString } from 'class-validator';

export class CompleteInterventionRequestDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
