import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { LoggerMiddleware } from "./shared/middleware/logger.middleware";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from './modules/user/user.module';
import { UserModule } from './modules/user/user.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
