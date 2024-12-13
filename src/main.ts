import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log(`Server running on port:${PORT}`, "Bootstrap");
  await app.listen(PORT);
}
bootstrap();
