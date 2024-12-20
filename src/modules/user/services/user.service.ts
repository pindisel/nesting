import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserRepositories } from "../repositories/user.repositories";
import { User } from "src/models";
import { GetAllDto, IdDto } from "src/common/dtos/common.dto";
import { hash } from "bcryptjs";

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

  async getUserById(param: IdDto): Promise<User> {
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

    const password = await hash(createUserDto.password, 10);

    await this.userRepositories.create({
      ...createUserDto,
      password,
    });

    return createUserDto;
  }

  async updateUser(
    param: IdDto,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const { id } = param;

    const existingUser = await this.userRepositories.findOne({
      id,
    });
    if (!existingUser) {
      throw new HttpException(
        "findUserWithId: Customer not found",
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepositories.update(id, updateUserDto);

    return updateUserDto;
  }

  async deleteUser(param: IdDto, name: string) {
    const { id } = param;

    const existingUser = await this.userRepositories.findOne({
      id,
    });
    if (!existingUser) {
      throw new HttpException(
        "findUserWithId: Customer not found",
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepositories.delete(id, name);

    return null;
  }
}
