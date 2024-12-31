import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { EnvConfig } from "./config/env.config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const PORT = new EnvConfig().serverPort;
const VERSION = process.env.npm_package_version;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Enable validation pipe for all requests
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

  // Enable Swagger
  const config = new DocumentBuilder()
    .setTitle("NestJS Template API")
    .setDescription("NestJS Template API description")
    .setVersion(VERSION)
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
  SwaggerModule.setup("api", app, documentFactory, {
    customSiteTitle: "NestJS Template API",
    jsonDocumentUrl: "/api-json",
  });

  // Start the server
  Logger.log(`Server running on port: ${PORT}`, "Bootstrap");
  await app.listen(PORT);
}
bootstrap();
