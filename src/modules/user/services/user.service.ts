import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserRepositories } from "../repositories/user.repositories";
import { User } from "src/models";
import { GetAllDto, GetByIdDto } from "src/common/dtos/get.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepositories: UserRepositories) {}

  async getAllUsers(query: GetAllDto): Promise<User[]> {
    const { page, limit, order, sort, search } = query;

    const users = await this.userRepositories.findAll(
      page,
      limit,
      order,
      sort,
      search,
    );

    return users;
  }

  async getUserById(param: GetByIdDto): Promise<User> {
    const { id } = param;

    const user = await this.userRepositories.findOne({
      id,
    });

    if (!user) {
      throw new HttpException(
        "findUserWithId: User not found",
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const existingUser = await this.userRepositories.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new HttpException(
        "findUserWithEmail: User already exist",
        HttpStatus.BAD_REQUEST,
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
      throw new HttpException(
        "findUserWithId: Customer not found",
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedUser = await this.userRepositories.update(id, updateUserDto);

    return updatedUser;
  }

  async deleteUser(id: number, name: string): Promise<User> {
    const existingUser = await this.userRepositories.findOne({
      id,
    });
    if (!existingUser) {
      throw new HttpException(
        "findUserWithId: Customer not found",
        HttpStatus.NOT_FOUND,
      );
    }

    const deletedUser = await this.userRepositories.delete(id, name);

    return deletedUser;
  }
}
