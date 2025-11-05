import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import sequelize from "./db.js";

// Importar modelos para garantir que sejam registrados
import "./models/Usuario.js";
import "./models/Aluno.js";
import "./models/Professor.js";
import "./models/personal.js";

// Rotas
import authRoutes from "./routes/authRoutes.js";
import alunoRoutes from "./routes/alunoRoutes.js";
import professorRoutes from "./routes/professorRoutes.js";
import personalRoutes from "./routes/personalRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// Middleware de log para debug
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.path} - Body:`, req.body);
  next();
});

// Conectar e sincronizar o banco SQLite
(async () => {
  try {
    await sequelize.sync({ force: true }); // força a recriação das tabelas
    console.log("✅ Banco de dados sincronizado com SQLite (tabelas recriadas)!");
  } catch (error) {
    console.error("❌ Erro ao sincronizar o banco:", error);
  }
})();

// Rotas principais
app.use("/api/auth", authRoutes);
app.use("/api/alunos", alunoRoutes);
app.use("/api/professores", professorRoutes);
app.use("/api/personais", personalRoutes);

// Rota de teste
app.get("/test", (req, res) => {
  console.log("🧪 Rota de teste chamada");
  res.json({ message: "Teste OK", jwt_secret: process.env.JWT_SECRET ? "Definido" : "Não definido" });
});

// Rota raiz
app.get("/", (req, res) => res.send("🏋️‍♂️ API da Academia Rodando!"));

// Debug das variáveis de ambiente
console.log("🔍 Variáveis de ambiente:");
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Definido" : "Não definido");

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
