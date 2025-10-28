import { Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

export class UnmarkAsFavoriteDto {
  @IsNumber()
  @Type(() => Number)
  userId: number

  @IsString()
  movieId: string
}