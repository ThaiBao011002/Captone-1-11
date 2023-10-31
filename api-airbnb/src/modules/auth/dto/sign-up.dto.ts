import { IsString, IsEmail, Length, IsNotEmpty, IsBoolean } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  pass_word: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsBoolean()
  gender: boolean;

  @IsNotEmpty()
  @IsString()
  birth_day: string;
}
