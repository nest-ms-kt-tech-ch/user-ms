import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class UnfollowDto {
  @IsNumber()
  @Type(() => Number)
  id: number

  @IsNumber()
  @Type(() => Number)
  unfollowTo: number
}