import { LoggingInterceptor } from "./logging.interceptor";
import { ResponseInterceptor } from "./response.interceptor";

export const interceptors = [LoggingInterceptor, ResponseInterceptor];
