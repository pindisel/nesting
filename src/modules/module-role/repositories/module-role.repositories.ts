import { Injectable } from "@nestjs/common";
import { QueryTypes } from "sequelize";
import { QueryBuilder } from "src/database/query-builder";
import { ModuleRole } from "src/models/entities/module-role.entity";

@Injectable()
export class ModuleRoleRepositories {
  constructor(private queryBuilder: QueryBuilder) {}

  async findOne(where: Record<string, any>): Promise<ModuleRole> {
    const moduleRole = await this.queryBuilder
      .select("*")
      .from("module_role")
      .where(where)
      .limit(1)
      .offset(0)
      .execute(QueryTypes.SELECT);
    return moduleRole[0];
  }
}
