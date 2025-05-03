const redemptionCodeService = require("../services/redemptionCodeService")
const userService = require("../services/userService")

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

  try {
    const user = await userService.getUser(userId);
    const neighborhoodId = user.VizinhançaidVizinhança;

    const rawCode = `${userId}${neighborhoodId}${Date.now()}`;
    const hash = Buffer.from(rawCode).toString("base64").replace(/[^A-Z0-9]/gi, "").substring(0, 8).toUpperCase();
    const codigo = hash;

    const dataResgate = new Date();
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