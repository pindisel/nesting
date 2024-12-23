import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { AuthRepositories } from "./repositories/auth.repositories";
import { UserRepositories } from "../user/repositories/user.repositories";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { EnvConfig } from "src/config/env.config";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: new EnvConfig().get("JWT_SECRET"),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepositories, UserRepositories, JwtStrategy],
})
export class AuthModule {}
