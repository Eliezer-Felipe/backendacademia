import express from "express";
import {
  criarPersonal,
  listarPersonais,
  buscarPersonal,
  atualizarPersonal,
  deletarPersonal,
} from "../controllers/personalController.js";

const router = express.Router();

router.post("/", criarPersonal);
router.get("/", listarPersonais);
router.get("/:id", buscarPersonal);
router.put("/:id", atualizarPersonal);
router.delete("/:id", deletarPersonal);

export default router;
