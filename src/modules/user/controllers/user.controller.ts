import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "src/models";
import { GetAllDto, IdDto } from "src/common/dtos/common.dto";
import { RoleGuard } from "src/shared/guards/role.guard";
import { ModuleName } from "src/common/decorators/auth-module.decorator";
import { JwtAuthGuard } from "src/shared/guards/jwt.guard";
import { ThrottlerRateLimitGuard } from "src/shared/guards/throttler.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("users")
@UseGuards(JwtAuthGuard, RoleGuard, ThrottlerRateLimitGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ModuleName("users")
  async getAllUsers(@Query() query: GetAllDto): Promise<User[]> {
    return await this.userService.getAllUsers(query);
  }

  @Post()
  @ModuleName("users")
  async createUser(
    @Body() body: CreateUserDto,
    @Req() { user }: any,
  ): Promise<User> {
    return await this.userService.createUser(body, user);
  }

  @Get(":id")
  @ModuleName("users")
  async getUserById(@Param() param: IdDto): Promise<User> {
    return await this.userService.getUserById(param);
  }

  @Patch(":id")
  @ModuleName("users")
  async updateUser(
    @Param() param: IdDto,
    @Body() body: UpdateUserDto,
    @Req() { user }: any,
  ): Promise<User> {
    return await this.userService.updateUser(param, body, user);
  }

  @Delete(":id")
  @ModuleName("users")
  async deleteUser(@Param() param: IdDto, @Req() { user }: any): Promise<any> {
    return await this.userService.deleteUser(param, user);
  }
}
