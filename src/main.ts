import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { EnvConfig } from "./config/env.config";

const PORT = new EnvConfig().serverPort;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log(`Server running on port: ${PORT}`, "Bootstrap");
  await app.listen(PORT);
}
bootstrap();
