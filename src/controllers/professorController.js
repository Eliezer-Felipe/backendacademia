import Professor from "../models/Professor.js";

export const criarProfessor = async (req, res) => {
  try {
    console.log("📝 Criando professor com dados:", req.body);
    
    // Verificar se já existe um professor com este email
    const professorExistente = await Professor.findOne({ where: { email: req.body.email } });
    if (professorExistente) {
      return res.status(400).json({ error: "Já existe um professor cadastrado com este email" });
    }
    
    const professor = await Professor.create(req.body);
    console.log("✅ Professor criado com sucesso:", professor.id);
    res.status(201).json(professor);
  } catch (error) {
    console.error("❌ Erro ao criar professor:", error.message);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "Email já está em uso por outro professor" });
    }
    
    if (error.name === 'SequelizeValidationError') {
      const mensagens = error.errors.map(err => err.message);
      return res.status(400).json({ error: "Dados inválidos", detalhes: mensagens });
    }
    
    res.status(500).json({ error: "Erro interno do servidor", detalhes: error.message });
  }
};

export const listarProfessores = async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar professores", detalhes: error.message });
  }
};

export const buscarProfessor = async (req, res) => {
  try {
    console.log("🔍 Buscando professor com ID:", req.params.id);
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) {
      console.log("❌ Professor não encontrado");
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    console.log("✅ Professor encontrado:", professor.toJSON());
    res.json(professor);
  } catch (error) {
    console.error("❌ Erro ao buscar professor:", error.message);
    res.status(500).json({ error: "Erro ao buscar professor", detalhes: error.message });
  }
};

export const atualizarProfessor = async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) return res.status(404).json({ error: "Professor não encontrado" });

    // Verificar se o email já está em uso por outro professor (se estiver sendo alterado)
    if (req.body.email && req.body.email !== professor.email) {
      const professorExistente = await Professor.findOne({ where: { email: req.body.email } });
      if (professorExistente) {
        return res.status(400).json({ error: "Este email já está em uso por outro professor" });
      }
    }

    await professor.update(req.body);
    res.json(professor);
  } catch (error) {
    console.error("❌ Erro ao atualizar professor:", error.message);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "Email já está em uso por outro professor" });
    }
    
    if (error.name === 'SequelizeValidationError') {
      const mensagens = error.errors.map(err => err.message);
      return res.status(400).json({ error: "Dados inválidos", detalhes: mensagens });
    }
    
    res.status(500).json({ error: "Erro ao atualizar professor", detalhes: error.message });
  }
};

export const deletarProfessor = async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) return res.status(404).json({ error: "Professor não encontrado" });

    await professor.destroy();
    res.json({ message: "Professor deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar professor", detalhes: error.message });
  }
};
