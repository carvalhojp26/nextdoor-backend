// controllers/redemptionCodeController.js
const redemptionCodeService = require("../services/redemptionCodeService");
const userService = require("../services/userService"); // Para buscar o utilizador e verificar pontos/vizinhança

const getRedemptionCodesController = async (req, res) => {
  try {
    if (!req.user || !req.user.idUtilizador) {
        return res.status(401).json({ error: "Não autenticado." });
    }
    const userId = req.user.idUtilizador;
    const result = await redemptionCodeService.getRedemptionsCode(userId);
    res.status(200).json({
      message: "Códigos de resgate obtidos com sucesso",
      redemptionCodes: result,
    });
  } catch (error) {
    console.error("CONTROLLER ERROR: getRedemptionCodesController -", error.message);
    res.status(500).json({ error: "Erro interno ao buscar códigos de resgate." });
  }
};

const createRedemptionCodeController = async (req, res) => {
  try {
    if (!req.user || !req.user.idUtilizador) {
        return res.status(401).json({ error: "Não autenticado." });
    }
    const userId = req.user.idUtilizador;
    const { ProdutoidProduto } = req.body;

    if (!ProdutoidProduto) {
        return res.status(400).json({ error: "ID do Produto é obrigatório." });
    }

    const createdRedemptionCode = await redemptionCodeService.redeemProduct(userId, ProdutoidProduto);
    
    // A mensagem de sucesso pode ser mais genérica, e o objeto redemptionCode contém os detalhes
    res.status(201).json({
      message: "Produto resgatado com sucesso!", // Mensagem mais direta
      redemptionCode: createdRedemptionCode, 
    });

  } catch (error) {
    console.error("CONTROLLER ERROR: createRedemptionCodeController -", error.message);
    // O serviço já lança erros com mensagens descritivas (ex: "Pontos insuficientes")
    // Retorna 400 para erros de negócio, 500 para outros erros inesperados
    const statusCode = error.message === "Utilizador não encontrado." || error.message === "Produto não encontrado." ? 404 : 400;
    res.status(error.message.includes("Falha ao") ? 500 : statusCode).json({ error: error.message });
  }
};

const getAllRedemptionCodesAdminController = async (req, res) => {
  try {
    // Verificação de tipo de utilizador (Admin)
    if (!req.user || req.user.idTipoUtilizador !== 1) { // Assumindo que 1 é Admin
        return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const result = await redemptionCodeService.getAllRedemptionCodesAdmin(page, limit);
    res.status(200).json({
      message: "Todos os códigos de resgate obtidos com sucesso.",
      ...result
    });
  } catch (error) {
    console.error("CONTROLLER ERROR: getAllRedemptionCodesAdminController -", error.message);
    res.status(500).json({ error: "Erro interno ao buscar todos os códigos de resgate." });
  }
};

module.exports = {
  getRedemptionCodesController,
  createRedemptionCodeController,
  getAllRedemptionCodesAdminController,
};