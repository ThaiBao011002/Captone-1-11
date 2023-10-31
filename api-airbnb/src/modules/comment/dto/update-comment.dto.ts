import { IsString, IsNotEmpty, IsDateString, IsNumber, Max, Min, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @Max(5)
  @Min(1)
  @IsNumber()
  rate: number;

  @IsOptional()
  @IsDateString()
  comment_date: string;
}
