import { Dialect } from "sequelize";
import { IDatabaseConfig } from "../shared/interfaces/dbConfig.interface";
import "dotenv/config";
require("ts-node/register");

const config: IDatabaseConfig = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
  },
};

export = config;
