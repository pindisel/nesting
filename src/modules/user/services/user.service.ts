import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserService {
  create(CreateUserDto: CreateUserDto) {
    return "This action adds a new te";
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} te`;
  }

  update(id: number, UpdateUserDto: UpdateUserDto) {
    return `This action update a #${id} te`;
  }

  remove(id: number) {
    return `This action removes a #${id} te`;
  }
}
