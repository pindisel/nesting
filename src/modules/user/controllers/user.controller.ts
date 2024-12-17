import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "src/models";
import { GetAllDto, GetByIdDto } from "src/common/dtos/get.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: GetAllDto): Promise<User[]> {
    return await this.userService.getAllUsers(query);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    return await this.userService.createUser(createUserDto);
  }

  @Get(":id")
  async getUserById(@Param() param: GetByIdDto): Promise<User> {
    return await this.userService.getUserById(param);
  }

  @Patch(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string, @Param("name") name: string) {
    return await this.userService.deleteUser(+id, name);
  }
}
