import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { EnvConfig } from "./config/env.config";

const PORT = new EnvConfig().serverPort;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  Logger.log(`Server running on port: ${PORT}`, "Bootstrap");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(PORT);
}
bootstrap();
