import { CanActivate, ExecutionContext } from "@nestjs/common";

export class MockJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request.user = { id: 1, email: "test@example.com" }; // Mock authenticated user
    return true; // Allow access
  }
}
