import express from "express";
import {
  criarProfessor,
  listarProfessores,
  buscarProfessor,
  atualizarProfessor,
  deletarProfessor,
} from "../controllers/professorController.js";

const router = express.Router();

router.post("/", criarProfessor);
router.get("/", listarProfessores);
router.get("/:id", buscarProfessor);
router.put("/:id", atualizarProfessor);
router.delete("/:id", deletarProfessor);

export default router;
