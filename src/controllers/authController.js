import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

export const registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: "Email já cadastrado" });

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash });

    res.status(201).json({ message: "Usuário criado com sucesso!", usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário", detalhes: error.message });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    console.log("🔍 Iniciando processo de login para:", email);
    
    // Usar uma chave fixa para teste
    const JWT_SECRET = "minha_chave_secreta_fixa_para_teste_123456789";
    console.log("🔑 Usando JWT_SECRET fixo para teste");
    
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      console.log("❌ Usuário não encontrado");
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    console.log("✅ Usuário encontrado:", usuario.nome);

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      console.log("❌ Senha incorreta");
      return res.status(400).json({ error: "Senha incorreta" });
    }

    console.log("✅ Senha correta, gerando token...");

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email }, 
      JWT_SECRET, 
      { expiresIn: "1d" }
    );

    console.log("✅ Token gerado com sucesso");

    res.json({
      message: "Login bem-sucedido",
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (error) {
    console.error("❌ Erro no login:", error.message);
    console.error("❌ Stack:", error.stack);
    res.status(500).json({ error: "Erro ao realizar login", detalhes: error.message });
  }
};
