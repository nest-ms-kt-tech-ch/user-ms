import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class GetProfileDto {
  @IsNumber()
  @Type(() => Number)
  id: number
}