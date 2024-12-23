import { SequelizeOptions } from "sequelize-typescript";

export interface IDatabaseConfig {
  development: SequelizeOptions;
  staging: SequelizeOptions;
  production: SequelizeOptions;
}
