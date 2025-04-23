const { Produto, Estabelecimento, estadoProduto, tipoProduto} = require("../models/associations");

const getProducts = async () => {
  try {
    const products = await Produto.findAll({
      include: [
        { model: Estabelecimento },
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

const insertProduct = async (body) => {
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

    if (updatedRows === 0) {
      throw new Error(`Product with Id ${productId} not found.`);
    }

    const updatedProduct = await Produto.findOne({
      where: { idProduto: productId },
      include: [
        { model: Estabelecimento },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });

    return updatedProduct;
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

module.exports = { getProducts, insertProduct, updateProduct, deleteProduct };
