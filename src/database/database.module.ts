import { Global, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { QueryBuilder } from "./query-builder";

import "dotenv/config";
import * as config from "src/config/database.config";

const env = process.env.NODE_ENV || "development";

@Global()
@Module({
  imports: [SequelizeModule.forRoot(config[env])],
  providers: [QueryBuilder],
  exports: [QueryBuilder, SequelizeModule],
})
export class DatabaseModule {}
