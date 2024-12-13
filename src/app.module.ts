import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { LoggerMiddleware } from "./shared/middleware/logger.middleware";
import { DatabaseModule } from "./database/database.module";
import { UserModule, UserController, UserService } from "./modules";

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
