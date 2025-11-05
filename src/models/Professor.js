import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Professor = sequelize.define("Professor", {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  especialidade: { type: DataTypes.STRING, allowNull: false },
  telefone: { type: DataTypes.STRING, allowNull: false },
});

export default Professor;
