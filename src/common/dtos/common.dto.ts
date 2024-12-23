import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class GetAllDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  order?: string = "id";

  @IsOptional()
  @IsString()
  sort?: "ASC" | "DESC" = "ASC";

  @IsOptional()
  @IsString()
  search?: string = "";
}

export class IdDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
