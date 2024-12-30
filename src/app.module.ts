import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { LoggerMiddleware } from "./shared/middleware/logger.middleware";
import { DatabaseModule } from "./database/database.module";
import appModule from "./modules";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionFilter } from "./shared/filters/http-exception.filter";
import { interceptors } from "./shared/interceptors";
import { ThrottlerModule } from "@nestjs/throttler";
import { EnvConfig } from "./config/env.config";

@Module({
  imports: [
    DatabaseModule,
    ...appModule.modules,
    ThrottlerModule.forRoot([
      {
        ttl: new EnvConfig().get("THROTTLE_TTL"),
        limit: new EnvConfig().get("THROTTLE_LIMIT"),
        blockDuration: new EnvConfig().get("THROTTLE_DURATION"),
      },
    ]),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ...interceptors.map((interceptor) => ({
      provide: APP_INTERCEPTOR,
      useClass: interceptor,
    })),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
