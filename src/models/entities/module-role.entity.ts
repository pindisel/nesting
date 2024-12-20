import { Table, Column, Model } from "sequelize-typescript";

@Table({ tableName: "module_role", underscored: true })
export class ModuleRole extends Model {
  @Column
  module: string;

  @Column
  role: string;
}
