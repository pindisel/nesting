import { Injectable } from "@nestjs/common";
import { ModuleRoleRepositories } from "../repositories/module-role.repositories";

@Injectable()
export class ModuleRoleService {
  constructor(private readonly moduleRoleRepository: ModuleRoleRepositories) {}

  async hasPermission(module: string, role: string): Promise<boolean> {
    const moduleRole = await this.moduleRoleRepository.findOne({
      module,
      role,
    });

    return !!moduleRole;
  }
}
