import { SequelizeOptions } from "sequelize-typescript";

export interface IDatabaseConfig {
  development: SequelizeOptions;
  test: SequelizeOptions;
  production: SequelizeOptions;
}

export interface IModels {
  name?: string;
  schema?: any;
}
