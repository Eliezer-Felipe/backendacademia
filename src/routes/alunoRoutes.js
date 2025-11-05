import express from "express";
import {
  criarAluno,
  listarAlunos,
  buscarAluno,
  atualizarAluno,
  deletarAluno,
} from "../controllers/alunoController.js";

const router = express.Router();

router.post("/", (req, res) => {
  console.log("🎯 Rota POST /alunos chamada");
  criarAluno(req, res);
});

router.get("/", (req, res) => {
  console.log("🎯 Rota GET /alunos chamada");
  listarAlunos(req, res);
});

router.get("/:id", buscarAluno);
router.put("/:id", atualizarAluno);
router.delete("/:id", deletarAluno);

export default router;
