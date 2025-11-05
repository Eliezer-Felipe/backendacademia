import express from "express";
import { registrar, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/registrar", (req, res) => {
  console.log("📝 Rota /registrar chamada");
  registrar(req, res);
});

router.post("/login", (req, res) => {
  console.log("🔐 Rota /login chamada");
  login(req, res);
});

export default router;
