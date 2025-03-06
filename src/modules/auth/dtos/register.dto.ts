import { IsEmail, IsString, MinLength } from 'class-validator';

export class GoogleUserDto {
  provider: string;
  providerId: number;
  email: string;
  fullName: string;
  picture: string;
}
