import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
export class CreateRoomDto {
  @IsNumber()
  location_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  total_guests: number;

  @IsNumber()
  total_bedrooms: number;

  @IsNumber()
  total_beds: number;

  @IsNumber()
  total_bathrooms: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  has_washing_machine: boolean;

  @IsBoolean()
  has_iron: boolean;

  @IsBoolean()
  has_tv: boolean;

  @IsBoolean()
  has_air_conditioner: boolean;

  @IsBoolean()
  has_wifi: boolean;

  @IsBoolean()
  has_kitchen: boolean;

  @IsBoolean()
  has_parking: boolean;

  @IsBoolean()
  has_pool: boolean;

  @IsBoolean()
  has_ironing_board: boolean;
}
