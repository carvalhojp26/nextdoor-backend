// src/controllers/productStatusController.js
const productStatusService = require('../services/productStatusService');

exports.getAllProductStatusController = async (req, res) => {
  try {
    const statuses = await productStatusService.getAllProductStatus();

    const formattedStatuses = statuses.map(s => ({
        idEstadoProduto: s.idEstadoProduto,
        nomeEstado: s.estadoProduto 
    }));
    res.status(200).json({ productStatus: formattedStatuses });
  } catch (error) {
    console.error("CONTROLLER ERROR: Error in getAllProductStatusController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};