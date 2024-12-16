import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import * as dayjs from "dayjs";

@Catch() // Catch all exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Customize your error response here
    response.status(status).json({
      success: false,
      message: exception.message || "Internal Server Error",
      statusCode: status,
      timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
  }
}
