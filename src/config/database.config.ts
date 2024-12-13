import { Dialect } from "sequelize";
import { IDatabaseConfig } from "../shared/interfaces/dbConfig.interface";
import "dotenv/config";
require("ts-node/register");
import { User } from "../models";

const config: IDatabaseConfig = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
    models: [User],
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
