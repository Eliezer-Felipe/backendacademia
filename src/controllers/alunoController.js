import Aluno from "../models/Aluno.js";

export const criarAluno = async (req, res) => {
  try {
    console.log("📝 Criando aluno com dados:", req.body);
    
    // Verificar se já existe um aluno com este email
    const alunoExistente = await Aluno.findOne({ where: { email: req.body.email } });
    if (alunoExistente) {
      return res.status(400).json({ error: "Já existe um aluno cadastrado com este email" });
    }
    
    const aluno = await Aluno.create(req.body);
    console.log("✅ Aluno criado com sucesso:", aluno.id);
    res.status(201).json(aluno);
  } catch (error) {
    console.error("❌ Erro ao criar aluno:", error.message);
    
    // Tratar erros específicos do Sequelize
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "Email já está em uso por outro aluno" });
    }
    
    if (error.name === 'SequelizeValidationError') {
      const mensagens = error.errors.map(err => err.message);
      return res.status(400).json({ error: "Dados inválidos", detalhes: mensagens });
    }
    
    res.status(500).json({ error: "Erro interno do servidor", detalhes: error.message });
  }
};

export const listarAlunos = async (req, res) => {
  try {
    console.log("📋 Listando alunos...");
    const alunos = await Aluno.findAll();
    console.log("✅ Encontrados", alunos.length, "alunos");
    res.json(alunos);
  } catch (error) {
    console.error("❌ Erro ao listar alunos:", error.message);
    res.status(500).json({ error: "Erro ao listar alunos", detalhes: error.message });
  }
};

export const buscarAluno = async (req, res) => {
  try {
    console.log("🔍 Buscando aluno com ID:", req.params.id);
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) {
      console.log("❌ Aluno não encontrado");
      return res.status(404).json({ error: "Aluno não encontrado" });
    }
    console.log("✅ Aluno encontrado:", aluno.toJSON());
    res.json(aluno);
  } catch (error) {
    console.error("❌ Erro ao buscar aluno:", error.message);
    res.status(500).json({ error: "Erro ao buscar aluno", detalhes: error.message });
  }
};

export const atualizarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });

    // Verificar se o email já está em uso por outro aluno (se estiver sendo alterado)
    if (req.body.email && req.body.email !== aluno.email) {
      const alunoExistente = await Aluno.findOne({ where: { email: req.body.email } });
      if (alunoExistente) {
        return res.status(400).json({ error: "Este email já está em uso por outro aluno" });
      }
    }

    await aluno.update(req.body);
    res.json(aluno);
  } catch (error) {
    console.error("❌ Erro ao atualizar aluno:", error.message);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "Email já está em uso por outro aluno" });
    }
    
    if (error.name === 'SequelizeValidationError') {
      const mensagens = error.errors.map(err => err.message);
      return res.status(400).json({ error: "Dados inválidos", detalhes: mensagens });
    }
    
    res.status(500).json({ error: "Erro ao atualizar aluno", detalhes: error.message });
  }
};

export const deletarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });

    await aluno.destroy();
    res.json({ message: "Aluno deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar aluno", detalhes: error.message });
  }
};
