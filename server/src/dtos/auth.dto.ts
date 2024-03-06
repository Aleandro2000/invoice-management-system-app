import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthDto {
  readonly id: number;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
