const { estadoProduto } = require('../models/association/associations'); // Importe o modelo

const getAllProductStatus = async () => {
  try {
    const statuses = await estadoProduto.findAll({
      order: [['estadoProduto', 'ASC']] // Ordena alfabeticamente pelo nome do estado
    });
    return statuses;
  } catch (error) {
    console.error("SERVICE ERROR: Error fetching all product statuses:", error);
    throw error;
  }
};

module.exports = { getAllProductStatus };