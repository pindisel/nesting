import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsEmail, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @ApiPropertyOptional()
  name: string;

  @IsString()
  @IsEmail()
  @ApiPropertyOptional()
  email: string;

  @IsString()
  @ApiPropertyOptional()
  password: string;

  @IsString()
  @ApiPropertyOptional()
  role: string;
}
