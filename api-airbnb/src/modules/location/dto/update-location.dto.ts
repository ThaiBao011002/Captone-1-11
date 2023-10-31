import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nation: string;
}
