import { CanActivate, ExecutionContext } from "@nestjs/common";

export class MockRoleGuard implements CanActivate {
  private mockHasPermission: (moduleName: string, role: string) => boolean;

  constructor(
    mockHasPermission: (moduleName: string, role: string) => boolean = () =>
      true,
  ) {
    this.mockHasPermission = mockHasPermission;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();

    // Simulate moduleName reflection metadata
    const moduleName = Reflect.getMetadata("moduleName", handler);

    if (!moduleName) {
      return true; // No module defined, allow access
    }

    // Simulate extracting user and role
    const user = request.user || { role: "default" };

    // Mock permission check
    return this.mockHasPermission(moduleName, user.role);
  }
}
