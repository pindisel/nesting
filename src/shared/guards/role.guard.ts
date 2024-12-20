import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ModuleRoleService } from "src/modules/module-role/services/module-role.service";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private moduleRoleService: ModuleRoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const moduleName = this.reflector.get<string>("moduleName", handler);

    if (!moduleName) {
      return true; // No specific module defined, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Extract user from the request

    // Check if the user's role has access to the module
    const hasAccess = await this.moduleRoleService.hasPermission(
      moduleName,
      user?.role,
    );
    return hasAccess;
  }
}
