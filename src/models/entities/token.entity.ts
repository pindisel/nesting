import { Table, Column, Model } from "sequelize-typescript";

@Table({ tableName: "token", underscored: true })
export class Token extends Model {
  @Column
  user_id: number;

  @Column
  token: string;
}
