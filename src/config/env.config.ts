import "dotenv/config";
import { validateSync } from "class-validator";
import { plainToClass } from "class-transformer";
import { EnvValidation } from "./env.validation";

export class EnvConfig {
  private readonly envConfig: EnvValidation;

  constructor() {
    const env = plainToClass(EnvValidation, process.env, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(env, { skipMissingProperties: false });
    if (errors.length > 0) {
      throw new Error(`Config validation error: ${errors}`);
    }
    this.envConfig = env;
  }

  get(key: string): any {
    return this.envConfig[key];
  }

  get isDev(): boolean {
    return this.envConfig.NODE_ENV === "development";
  }

  get serverPort(): number {
    return this.envConfig.PORT || 3000;
  }
}
