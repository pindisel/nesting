import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthRepositories } from "../repositories/auth.repositories";
import { compare } from "bcryptjs";
import { LoginDto } from "../dto/auth.dto";
import { UserRepositories } from "src/modules/user/repositories/user.repositories";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepositories: AuthRepositories,
    private readonly userRepositories: UserRepositories,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepositories.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new HttpException(
        "findUserWithEmail: User not found",
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordMatch = await compare(loginDto.password, user.password);

    if (!isPasswordMatch) {
      throw new HttpException(
        "comparePassword: Password not match",
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create token
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
