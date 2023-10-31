import { IsString, IsNotEmpty, IsDateString, IsNumber, Max, Min } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  room_id: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Max(5)
  @Min(1)
  @IsNumber()
  rate: number;

  @IsDateString()
  comment_date: string;
}
