const { Utilizador } = require("../models/association/associations");
const redemptionCodeService = require("../services/redemptionCodeService")

const getRedemptionCodesController = async (req, res) => {
  const userId = req.user.idUtilizador;
    try {
        const result = await redemptionCodeService.getRedemptionsCode(userId);
        res.status(200).json({ message: "Redemption codes fetched successfully", redemptionCodes: result  });
    } catch (error) {
        res.status(500).json("Internal server error");
    };
};

const createRedemptionCodeController = async (req, res) => {
  const userId = req.user.idUtilizador;
  const { ProdutoidProduto, estadoResgateidEstadoResgate } = req.body;

  const codigo = Math.random().toString(8).substring(2, 8).toUpperCase(); //gera um numero, converte-o para base octal, tira-lhe o 0 e vai buscar os numeros entre a posição 2 e 8
  const dataResgate = new Date();

  try {
    const result = await redemptionCodeService.createRedemptionCode({
      dataResgate,
      ProdutoidProduto,
      estadoResgateidEstadoResgate,
      codigo,
      UtilizadoridUtilizador: userId
    });

    res.status(201).json({
      message: "Redemption code created",
      redemptionCodes: result
    });
  } catch (error) {
    console.error("Error adding redemption code in controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRedemptionCodesController, createRedemptionCodeController };