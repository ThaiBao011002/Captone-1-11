import { IsDateString, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  room_id: number;

  @IsNumber()
  total_guests: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;
}
