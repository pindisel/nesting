import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserRepositories } from "./repositories/user.repositories";

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepositories],
})
export class UserModule {}
