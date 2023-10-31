import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsBoolean()
  gender: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  birth_day: string;
}
