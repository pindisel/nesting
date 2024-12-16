import { Global, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { QueryBuilder } from "./query-builder";

import "dotenv/config";
import * as config from "src/config/database.config";
import { EnvConfig } from "src/config/env.config";

@Global()
@Module({
  imports: [SequelizeModule.forRoot(config[new EnvConfig().get("NODE_ENV")])],
  providers: [QueryBuilder],
  exports: [QueryBuilder, SequelizeModule],
})
export class DatabaseModule {}
