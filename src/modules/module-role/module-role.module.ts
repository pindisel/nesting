import { Module } from "@nestjs/common";
import { ModuleRoleController } from "./controllers/module-role.controller";
import { ModuleRoleService } from "./services/module-role.service";
import { ModuleRoleRepositories } from "./repositories/module-role.repositories";

@Module({
  controllers: [ModuleRoleController],
  providers: [ModuleRoleService, ModuleRoleRepositories],
})
export class ModuleRoleModule {}
