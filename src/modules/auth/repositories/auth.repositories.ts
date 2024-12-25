import { Injectable } from "@nestjs/common";
import { QueryTypes } from "sequelize";
import { QueryBuilder } from "src/database/query-builder";
import { Token } from "src/models/entities/token.entity";

@Injectable()
export class AuthRepositories {
  constructor(private queryBuilder: QueryBuilder) {}

  async createToken(data: Record<string, any>, name: string): Promise<Token> {
    const token = await this.queryBuilder
      .insert("token", data, name)
      .execute(QueryTypes.INSERT);
    return token[0][0];
  }
}
