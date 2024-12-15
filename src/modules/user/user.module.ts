import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserRepositories } from "./repositories/user.repositories";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepositories],
})
export class UserModule {}
