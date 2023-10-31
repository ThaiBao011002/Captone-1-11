import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsNumber()
  room_id: number;

  @IsOptional()
  @IsNumber()
  total_guests: number;

  @IsOptional()
  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date: string;
}
