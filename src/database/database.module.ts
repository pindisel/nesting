import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import "dotenv/config";
import * as config from "src/config/database.config";

const env = process.env.NODE_ENV || "development";

@Module({
  imports: [SequelizeModule.forRoot(config[env])],
})
export class DatabaseModule {}
