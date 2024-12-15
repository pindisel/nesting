import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserRepositories } from "../repositories/user.repositories";
import { User } from "src/models";

@Injectable()
export class UserService {
  constructor(private readonly userRepositories: UserRepositories) {}

  // async getAllUsers(): Promise<User[]> {
  //   return this.userRepositories.findAll(20);
  // }

  // async createUser(createUserDto: CreateUserDto) {
  //   const existingUser = await this.userRepositories.findOne();

  //   return this.userRepositories.create(createUserDto);
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} te`;
  // }

  // update(id: number, UpdateUserDto: UpdateUserDto) {
  //   return `This action update a #${id} te`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} te`;
  // }
}
