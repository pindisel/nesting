import { IsString, IsInt, IsOptional, IsEnum } from "class-validator";

enum Environment {
  DEVELOPMENT = "development",
  STAGING = "staging",
  PRODUCTION = "production",
}

export class EnvValidation {
  @IsInt()
  PORT: number;
  @IsEnum(Environment)
  NODE_ENV: Environment;

  // Database env
  @IsString()
  DB_HOST: string;

  @IsInt()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  DB_DIALECT: string;
}