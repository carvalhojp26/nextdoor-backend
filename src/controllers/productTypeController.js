// src/controllers/productTypeController.js
const productTypeService = require('../services/productTypeService');

exports.getAllProductTypesController = async (req, res) => {
  try {
    const types = await productTypeService.getAllProductTypes();
    // O frontend espera a chave 'productTypes' e que cada objeto tenha 'idTipoProduto' e 'nomeTipoProduto'
    // Vamos mapear para o formato que o frontend espera para o dropdown.
    const formattedTypes = types.map(t => ({
        idTipoProduto: t.idTipoProduto,
        nomeTipoProduto: t.tipoProduto // Mapeando 'tipoProduto' do modelo para 'nomeTipoProduto'
    }));
    res.status(200).json({ productTypes: formattedTypes });
  } catch (error) {
    console.error("CONTROLLER ERROR: Error in getAllProductTypesController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};