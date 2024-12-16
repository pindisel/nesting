import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserRepositories } from "../repositories/user.repositories";
import { User } from "src/models";

@Injectable()
export class UserService {
  constructor(private readonly userRepositories: UserRepositories) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepositories.findAll();

    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepositories.findOne({
      id,
    });

    if (!user) {
      throw new Error(`Customer not found with id ${id}`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const existingUser = await this.userRepositories.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new Error(
        `Customer already exists with email ${createUserDto.email}`,
      );
    }

    await this.userRepositories.create(createUserDto);

    return createUserDto;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepositories.findOne({
      id,
    });
    if (!existingUser) {
      throw new Error(`Customer not found with id ${id}`);
    }

    const updatedUser = await this.userRepositories.update(id, updateUserDto);

    return updatedUser;
  }

  async deleteUser(id: number, name: string): Promise<User> {
    const existingUser = await this.userRepositories.findOne({
      id,
    });
    if (!existingUser) {
      throw new Error(`Customer not found with id ${id}`);
    }

    const deletedUser = await this.userRepositories.delete(id, name);

    return deletedUser;
  }
}
