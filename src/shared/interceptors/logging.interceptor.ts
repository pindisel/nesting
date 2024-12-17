import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now(); // Start time
    const className = context.getClass().name; // Controller class name
    const handlerName = context.getHandler().name; // Handler method name

    return next.handle().pipe(
      tap(() => {
        // Log successful responses
        Logger.log(
          `${className}.${handlerName} - ${Date.now() - now}ms`,
          className,
        );
      }),
      catchError((error) => {
        // Log errors
        Logger.error(
          `${className}.${handlerName} - Error: ${error.message} (${Date.now() - now}ms)`,
          error.stack,
          className,
        );
        return throwError(() => error); // Rethrow the error
      }),
    );
  }
}
