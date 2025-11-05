import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Aluno = sequelize.define("Aluno", {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING, allowNull: false },
  plano: { type: DataTypes.STRING, allowNull: false },
});

export default Aluno;
