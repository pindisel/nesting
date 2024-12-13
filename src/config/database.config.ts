import { Dialect } from "sequelize";
import { IDatabaseConfig } from "../shared/interfaces/dbConfig.interface";
import "dotenv/config";
require("ts-node").register({ transpileOnly: true });
import models from "../models";

const config: IDatabaseConfig = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
    models,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
    models,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
    models,
  },
};

export = config;
