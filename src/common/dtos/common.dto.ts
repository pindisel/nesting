import { ApiParam, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class GetAllDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    default: 0,
    description: "Page number",
  })
  page?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    default: 10,
    description: "Number of items per page",
  })
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    default: "id",
    description: "Column name to sort by",
  })
  order?: string = "id";

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    default: "ASC",
    description: "Sort order",
  })
  sort?: "ASC" | "DESC" = "ASC";

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    default: "",
    description: "Search query",
  })
  search?: string = "";
}

export class IdDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: "ID parameter", required: true })
  id: number;
}
