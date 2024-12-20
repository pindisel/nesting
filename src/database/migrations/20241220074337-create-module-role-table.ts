import { QueryInterface, DataTypes } from "sequelize";

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("module_role", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      module: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.STRING,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_by: {
        type: DataTypes.STRING,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
      deleted_by: {
        type: DataTypes.STRING,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("module_role");
  },
};
