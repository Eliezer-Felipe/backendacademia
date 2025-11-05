import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Cria a conexão com SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite", // arquivo SQLite que será criado localmente
  logging: false, // desativa logs SQL no console
});

// Testa a conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com SQLite estabelecida com sucesso!");
  } catch (error) {
    console.error("❌ Não foi possível conectar ao SQLite:", error);
  }
})();

export default sequelize;
