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
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "src/models";
import { GetAllDto, IdDto } from "src/common/dtos/common.dto";
import { RoleGuard } from "src/shared/guards/role.guard";
import { ModuleName } from "src/common/decorators/auth-module.decorator";
import { JwtAuthGuard } from "src/shared/guards/jwt.guard";

@Controller("users")
@UseGuards(JwtAuthGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ModuleName("users")
  async getAllUsers(@Query() query: GetAllDto): Promise<User[]> {
    return await this.userService.getAllUsers(query);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    return await this.userService.createUser(body);
  }

  @Get(":id")
  async getUserById(@Param() param: IdDto): Promise<User> {
    return await this.userService.getUserById(param);
  }

  @Patch(":id")
  async updateUser(
    @Param() param: IdDto,
    @Body() body: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return await this.userService.updateUser(param, body);
  }

  @Delete(":id")
  async deleteUser(@Param() param: IdDto) {
    const name = "tes";
    return await this.userService.deleteUser(param, name);
  }
}
