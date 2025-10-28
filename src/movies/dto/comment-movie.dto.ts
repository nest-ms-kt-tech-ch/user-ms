import { Type } from "class-transformer";
import { IsNumber, IsString, MinLength } from "class-validator";

export class CommentMovieDto {
  @IsNumber()
  @Type(() => Number)
  userId: number

  @IsString()
  movieId: string

  @IsString()
  @MinLength(1)
  comment: string
}