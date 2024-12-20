import { Table, Column, Model } from "sequelize-typescript";

@Table({ tableName: "user", underscored: true })
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: string;
}
