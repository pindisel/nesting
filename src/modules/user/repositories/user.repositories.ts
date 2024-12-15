import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { QueryTypes } from "sequelize";
import { QueryBuilder } from "src/database/query-builder";

@Injectable()
export class UserRepositories {
  constructor(private queryBuilder: QueryBuilder) {}
  async findAll(age: number, limit: number = 10, offset: number = 0) {
    const users = await this.queryBuilder
      .select(["id", "name", "email"])
      .from("users")
      .where({ age: age })
      .orderBy("name", "ASC")
      .limit(limit)
      .offset(offset)
      .execute(QueryTypes.SELECT);
    return users;
  }
}
