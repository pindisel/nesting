import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as dayjs from "dayjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const url = context.switchToHttp().getRequest().url;
    const method = context.switchToHttp().getRequest().method;

    return next.handle().pipe(
      // Process successful responses
      map((data) => {
        // Wrap raw data
        return {
          success: true,
          message: `${method} ${url} success`,
          data,
          timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        };
      }),
    );
  }
}
