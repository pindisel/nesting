import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthRepositories } from "../repositories/auth.repositories";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { LoginDto } from "../dto/auth.dto";
import { UserRepositories } from "src/modules/user/repositories/user.repositories";

@Injectable()
export class AuthService {
  constructor(
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
    const accessToken = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      },
    );

    await this.authRepositories.createToken({
      user_id: user.id,
      token: accessToken,
    });

    return {
      accessToken,
    };
  }
}
