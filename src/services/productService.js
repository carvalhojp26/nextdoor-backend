const { Produto, Estabelecimento, estadoProduto, tipoProduto} = require("../models/association/associations");
const { Op } = require("sequelize");
const getProductById = async (productId, establishmentIds) => {
  try {
    const product = await Produto.findOne({
      where: { idProduto: productId, EstabelecimentoidEstabelecimento: { [Op.in]: establishmentIds }},
      include: [
        { model: Estabelecimento },
        { model: estadoProduto },
        { model: tipoProduto }
      ],
    });

    return product;
  } catch (error) {
    console.error("Error getting product by ID from database:", error);
    throw error;
  }
};

const getProductByType = async (typeId, establishmentIds) => {
  try {
    const product = await Produto.findAll({
      where: { tipoProdutoidTipoProduto: typeId, EstabelecimentoidEstabelecimento: { [Op.in]: establishmentIds } },
      include: [
        { model: Estabelecimento },
        { model: estadoProduto },
        { model: tipoProduto }
      ],
    });

    return product;
  } catch (error) {
    console.error("Error getting product by type from database:", error);
    throw error;
  }
};


const getProduct = async (establishmentIds) => {
  try {
    const products = await Produto.findAll({
      where: { EstabelecimentoidEstabelecimento: { [Op.in]: establishmentIds } },
      include: [
        { model: Estabelecimento},
        { model: estadoProduto },
        { model: tipoProduto }
      ],
    });
    return products;
  } catch (error) {
    console.error("Error getting products in database:", error);
    throw error;
  }
};

const getProductByEstablishment = async (establishmentId) => {
  try {
    const product = await Produto.findAll({
      where: { EstabelecimentoidEstabelecimento: establishmentId },
      include: [
        { model: Estabelecimento },
        { model: estadoProduto },
        { model: tipoProduto }
      ],
    });

    return product;
  } catch (error) {
    console.error("Error getting product by establishment from database:", error);
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

module.exports = { getProductById, getProductByType, getProduct, getProductByEstablishment, createProduct, updateProduct, deleteProduct };
