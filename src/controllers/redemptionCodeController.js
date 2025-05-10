const redemptionCodeService = require("../services/redemptionCodeService");

const getRedemptionCodesController = async (req, res) => {
  const userId = req.user.idUtilizador;
  try {
    const result = await redemptionCodeService.getRedemptionsCode(userId);
    res.status(200).json({
      message: "Redemption codes fetched successfully",
      redemptionCodes: result,
    });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

const createRedemptionCodeController = async (req, res) => {
  const userId = req.user.idUtilizador;
  const { ProdutoidProduto } = req.body;

  try {
    const result = await redemptionCodeService.redeemProduct(userId, ProdutoidProduto);
    res.status(201).json({
      message: "Redemption code successfully created",
      redemptionCodes: result,
    });
  } catch (error) {
    console.error("Error redeeming product:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRedemptionCodesController,
  createRedemptionCodeController,
};
