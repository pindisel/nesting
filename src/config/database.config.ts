require("ts-node").register({ transpileOnly: true });
import { Dialect } from "sequelize";
import models from "../models";
import { IDatabaseConfig } from "../shared/interfaces/db-config.interface";
import { EnvConfig } from "./env.config";
import { Logger } from "@nestjs/common";

const envConfig = new EnvConfig();

const createConfig = (): IDatabaseConfig => {
  const commonConfig = {
    username: envConfig.get("DB_USERNAME"),
    password: envConfig.get("DB_PASSWORD"),
    database: envConfig.get("DB_DATABASE"),
    host: envConfig.get("DB_HOST"),
    port: +envConfig.get("DB_PORT"),
    dialect: (envConfig.get("DB_DIALECT") as Dialect) || "postgres",
    models,
    logging: true,
  };

  Logger.log(
    `Connected to database: ${envConfig.get("DB_DATABASE")}`,
    "DatabaseConfig",
  );

  return {
    development: commonConfig,
    staging: commonConfig,
    production: commonConfig,
  };
};

const config: IDatabaseConfig = createConfig();

export = config;
