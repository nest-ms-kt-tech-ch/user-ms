import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class MarkAsFavoriteDto {
  @IsNumber()
  @Type(() => Number)
  userId: number

  @IsString()
  movieId: string
}