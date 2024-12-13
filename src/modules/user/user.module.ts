import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/models";
import { UserRepositories } from "./repositories/user.repositories";

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepositories],
})
export class UserModule {}
