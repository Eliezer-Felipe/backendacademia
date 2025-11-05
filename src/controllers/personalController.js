import Personal from "../models/personal.js";

export const criarPersonal = async (req, res) => {
  try {
    console.log("📝 Criando personal com dados:", req.body);
    
    // Verificar se já existe um personal com este email
    const personalExistente = await Personal.findOne({ where: { email: req.body.email } });
    if (personalExistente) {
      return res.status(400).json({ error: "Já existe um personal trainer cadastrado com este email" });
    }
    
    const personal = await Personal.create(req.body);
    console.log("✅ Personal criado com sucesso:", personal.id);
    res.status(201).json(personal);
  } catch (error) {
    console.error("❌ Erro ao criar personal:", error.message);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "Email já está em uso por outro personal trainer" });
    }
    
    if (error.name === 'SequelizeValidationError') {
      const mensagens = error.errors.map(err => err.message);
      return res.status(400).json({ error: "Dados inválidos", detalhes: mensagens });
    }
    
    res.status(500).json({ error: "Erro interno do servidor", detalhes: error.message });
  }
};

export const listarPersonais = async (req, res) => {
  try {
    const pessoais = await Personal.findAll();
    res.json(pessoais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar pessoais", detalhes: error.message });
  }
};

export const buscarPersonal = async (req, res) => {
  try {
    console.log("🔍 Buscando personal com ID:", req.params.id);
    const personal = await Personal.findByPk(req.params.id);
    if (!personal) {
      console.log("❌ Personal não encontrado");
      return res.status(404).json({ error: "Personal não encontrado" });
    }
    console.log("✅ Personal encontrado:", personal.toJSON());
    res.json(personal);
  } catch (error) {
    console.error("❌ Erro ao buscar personal:", error.message);
    res.status(500).json({ error: "Erro ao buscar personal", detalhes: error.message });
  }
};

export const atualizarPersonal = async (req, res) => {
  try {
    const personal = await Personal.findByPk(req.params.id);
    if (!personal) return res.status(404).json({ error: "Personal não encontrado" });

    // Verificar se o email já está em uso por outro personal (se estiver sendo alterado)
    if (req.body.email && req.body.email !== personal.email) {
      const personalExistente = await Personal.findOne({ where: { email: req.body.email } });
      if (personalExistente) {
        return res.status(400).json({ error: "Este email já está em uso por outro personal trainer" });
      }
    }

    await personal.update(req.body);
    res.json(personal);
  } catch (error) {
    console.error("❌ Erro ao atualizar personal:", error.message);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "Email já está em uso por outro personal trainer" });
    }
    
    if (error.name === 'SequelizeValidationError') {
      const mensagens = error.errors.map(err => err.message);
      return res.status(400).json({ error: "Dados inválidos", detalhes: mensagens });
    }
    
    res.status(500).json({ error: "Erro ao atualizar personal", detalhes: error.message });
  }
};

export const deletarPersonal = async (req, res) => {
  try {
    const personal = await Personal.findByPk(req.params.id);
    if (!personal) return res.status(404).json({ error: "Personal não encontrado" });

    await personal.destroy();
    res.json({ message: "Personal deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar personal", detalhes: error.message });
  }
};
