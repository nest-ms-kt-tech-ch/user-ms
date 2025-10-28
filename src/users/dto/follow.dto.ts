import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class FollowDto {
  @IsNumber()
  @Type(() => Number)
  id: number

  @IsNumber()
  @Type(() => Number)
  followTo: number
}