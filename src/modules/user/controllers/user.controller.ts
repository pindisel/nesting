import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "src/models";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get(":id")
  getUserById(@Param("id") id: string): Promise<User> {
    return this.userService.getUserById(+id);
  }

  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string, @Param("name") name: string) {
    return this.userService.deleteUser(+id, name);
  }
}
