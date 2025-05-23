const {
  Produto,
  Estabelecimento,
  estadoProduto,
  tipoProduto,
  Endereco,
} = require("../models/association/associations");
const getProductById = async (productId, neighborhoodId) => {
  try {
    const product = await Produto.findOne({
      where: {
        idProduto: productId, estadoProdutoidEstadoProduto: 1
      },
      include: [
        {
          model: Estabelecimento,
          where: { VizinhancaidVizinhanca: neighborhoodId },
          include: [{ model: Endereco }],
        },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });

    return product;
  } catch (error) {
    console.error("Error getting product by ID from database:", error);
    throw error;
  }
};

const getProductByType = async (typeId, neighborhoodId) => {
  try {
    const product = await Produto.findAll({
      where: { tipoProdutoidTipoProduto: typeId, estadoProdutoidEstadoProduto: 1 },
      include: [
        {
          model: Estabelecimento,
          where: { VizinhancaidVizinhanca: neighborhoodId },
          include: [{ model: Endereco }],
        },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });

    return product;
  } catch (error) {
    console.error("Error getting product by type from database:", error);
    throw error;
  }
};

const getProduct = async (neighborhoodId) => {
  try {
    const products = await Produto.findAll({
      where: { estadoProdutoidEstadoProduto: 1 },
      include: [
        {
          model: Estabelecimento,
          where: { VizinhancaidVizinhanca: neighborhoodId},
          include: [{ model: Endereco }],
        },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });
    return products;
  } catch (error) {
    console.error("Error getting products in database:", error);
    throw error;
  }
};

const getProductByEstablishment = async (establishmentId, neighborhoodId) => {
  try {
    const product = await Produto.findAll({
      where: { EstabelecimentoidEstabelecimento: establishmentId, estadoProdutoidEstadoProduto: 1 },
      include: [
        {
          model: Estabelecimento,
          where: { VizinhancaidVizinhanca: neighborhoodId },
          include: [{ model: Endereco }],
        },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });

    return product;
  } catch (error) {
    console.error(
      "Error getting product by establishment from database:",
      error
    );
    throw error;
  }
};

const getProductByAllEstablishment = async (establishmentId) => {
  try {
    const product = await Produto.findAll({
      where: { EstabelecimentoidEstabelecimento: establishmentId },
      include: [
        { model: Estabelecimento, include: [{ model: Endereco }] },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });

    return product;
  } catch (error) {
    console.error(
      "Error getting product by establishment from database:",
      error
    );
    throw error;
  }
};

const createProduct = async (body) => {
  try {
    const product = await Produto.create(body);
    return product;
  } catch (error) {
    console.error("Error adding product in database:", error);
    throw error;
  }
};

const updateProduct = async (productId, body) => {
  try {
    const [updatedRows] = await Produto.update(body, {
      where: { idProduto: productId },
    });
    return updatedRows;
  } catch (error) {
    console.error("Error updating product in database:", error);
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const deleted = await Produto.destroy({ where: { idProduto: productId } });
    return deleted;
  } catch (error) {
    console.error("Error deleting product in database:", error);
    throw error;
  }
};

module.exports = {
  getProductById,
  getProductByType,
  getProduct,
  getProductByEstablishment,
  getProductByAllEstablishment,
  createProduct,
  updateProduct,
  deleteProduct,
};
