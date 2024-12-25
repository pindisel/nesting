import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { QueryTypes } from "sequelize";
import { QueryBuilder } from "src/database/query-builder";
import { User } from "src/models";
import * as dayjs from "dayjs";

const SEARCH_COLUMNS = ["name", "email"];

@Injectable()
export class UserRepositories {
  constructor(private queryBuilder: QueryBuilder) {}

  async findAll(
    page: number,
    limit: number,
    order: string,
    sort: "ASC" | "DESC",
    search: string,
  ): Promise<User[]> {
    const users = await this.queryBuilder
      .select("*")
      .from("user")
      .where({})
      .search(SEARCH_COLUMNS, search)
      .orderBy(order, sort)
      .limit(limit)
      .offset(page)
      .execute(QueryTypes.SELECT);

    return users;
  }

  async findOne(where: Record<string, any>): Promise<User> {
    const user = await this.queryBuilder
      .select("*")
      .from("user")
      .where(where)
      .limit(1)
      .offset(0)
      .execute(QueryTypes.SELECT);
    return user[0];
  }

  async create(data: CreateUserDto, name: string): Promise<User> {
    const user = await this.queryBuilder
      .insert("user", data, name)
      .execute(QueryTypes.INSERT);
    return user[0][0];
  }

  async update(id: number, data: CreateUserDto, name: string): Promise<User> {
    const user = await this.queryBuilder
      .update("user", data, name)
      .where({
        id,
      })
      .execute(QueryTypes.UPDATE);
    return user;
  }

  async delete(id: number, name: string): Promise<User> {
    const user = await this.queryBuilder
      .update("user", {
        deleted_at: dayjs().format("YYYY-MM-DD HH:mm:ss ZZ"),
        deleted_by: name,
      })
      .where({
        id,
      })
      .execute(QueryTypes.UPDATE);
    return user;
  }
}
