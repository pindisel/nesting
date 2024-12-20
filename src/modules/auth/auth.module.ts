import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { AuthRepositories } from "./repositories/auth.repositories";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepositories],
})
export class AuthModule {}
