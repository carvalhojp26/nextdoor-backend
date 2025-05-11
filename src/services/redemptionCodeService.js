const {
  resgateCodigo,
  Produto,
  Utilizador,
  estadoResgate,
  estadoProduto,
} = require("../models/association/associations");
const userService = require("./userService");
const productService = require("./productService");

const getRedemptionsCode = async (userId) => {
  try {
    const redemptionCode = await resgateCodigo.findAll({
      where: { UtilizadoridUtilizador: userId },
      include: [
        { model: Produto },
        { model: Utilizador },
        { model: estadoResgate },
      ],
    });
    return redemptionCode;
  } catch (error) {
    console.error("Error getting redemption codes in database:", error);
    throw error;
  }
};

const createRedemptionCode = async (body) => {
  try {
    const redemptionCode = await resgateCodigo.create(body);
    return redemptionCode;
  } catch (error) {
    console.error("Error adding redemption code in database:", error);
    throw error;
  }
};

const generateCode = (userId, neighborhoodId) => {
  const rawCode = `${userId}${neighborhoodId}${Date.now()}`;
  return Buffer.from(rawCode)
    .toString("base64")
    .replace(/[^A-Z0-9]/gi, "")
    .substring(0, 8)
    .toUpperCase();
};

const redeemProduct = async (userId, productId) => {
  const user = await userService.getUser(userId);
  const neighborhoodId = user.VizinhançaidVizinhança;

  const product = await productService.getProductById(
    productId,
    neighborhoodId
  );
  if (!product) throw new Error("Product not found");

  if (product.stockProduto <= 0) {
    const updateStateProduct = await productService.updateProduct(productId, {
      estadoProdutoidEstadoProduto: product.estadoProdutoidEstadoProduto = 2, //Colocar o produto a não visivel
    });
    if (!updateStateProduct) throw new Error("Failed to update product state");
    throw new Error("Product is unavable");
  }

  if (user.pontosUtilizador < product.precoProduto) {
    throw new Error("Insufficient points to redeem this product");
  }

  const updateUser = await userService.updateUser(userId, {
    pontosUtilizador: user.pontosUtilizador - product.precoProduto,
  });
  if (!updateUser) throw new Error("Failed to update user points");

  const code = generateCode(userId, neighborhoodId);
  const redemptionDate = new Date();
  const estadoResgateidEstadoResgate = 1;

  const updateStockProduct = await productService.updateProduct(productId, {
    stockProduto: product.stockProduto - 1,
  });
  if (!updateStockProduct) throw new Error("Failed to update product stock");
  return await createRedemptionCode({
    dataResgate: redemptionDate,
    ProdutoidProduto: productId,
    estadoResgateidEstadoResgate,
    codigo: code,
    UtilizadoridUtilizador: userId,
  });
};
module.exports = { getRedemptionsCode, createRedemptionCode, redeemProduct };
