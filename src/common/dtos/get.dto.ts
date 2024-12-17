import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class GetAllDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

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

export class GetByIdDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
