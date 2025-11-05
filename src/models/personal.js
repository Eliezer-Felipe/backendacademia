import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Personal = sequelize.define("Personal", {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  especialidade: { type: DataTypes.STRING, allowNull: false },
  valorHora: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

export default Personal;
