import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional } from 'class-validator';
export class UpdateRoomDto {
  @IsOptional()
  @IsNumber()
  location_id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  total_guests: number;

  @IsOptional()
  @IsNumber()
  total_bedrooms: number;

  @IsOptional()
  @IsNumber()
  total_beds: number;

  @IsOptional()
  @IsNumber()
  total_bathrooms: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  has_washing_machine: boolean;

  @IsOptional()
  @IsBoolean()
  has_iron: boolean;

  @IsOptional()
  @IsBoolean()
  has_tv: boolean;

  @IsOptional()
  @IsBoolean()
  has_air_conditioner: boolean;

  @IsOptional()
  @IsBoolean()
  has_wifi: boolean;

  @IsOptional()
  @IsBoolean()
  has_kitchen: boolean;

  @IsOptional()
  @IsBoolean()
  has_parking: boolean;

  @IsOptional()
  @IsBoolean()
  has_pool: boolean;

  @IsOptional()
  @IsBoolean()
  has_ironing_board: boolean;
}
