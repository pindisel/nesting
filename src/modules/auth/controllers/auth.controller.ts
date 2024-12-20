import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }
}
