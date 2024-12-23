import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserRepositories } from "./repositories/user.repositories";
import { ModuleRoleRepositories } from "../module-role/repositories/module-role.repositories";
import { ModuleRoleService } from "../module-role/services/module-role.service";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepositories,
    ModuleRoleService,
    ModuleRoleRepositories,
  ],
})
export class UserModule {}
