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
import { GetAllDto, IdDto } from "src/common/dtos/common.dto";

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
  async getUserById(@Param() param: IdDto): Promise<User> {
    return await this.userService.getUserById(param);
  }

  @Patch(":id")
  async updateUser(
    @Param() param: IdDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return await this.userService.updateUser(param, updateUserDto);
  }

  @Delete(":id")
  async deleteUser(@Param() param: IdDto) {
    const name = "tes";
    return await this.userService.deleteUser(param, name);
  }
}
