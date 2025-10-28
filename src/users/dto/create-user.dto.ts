import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  public name: string;

  @IsString()
  @IsEmail()
  public email: string;
}
