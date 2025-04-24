const { resgateCodigo, Produto, Utilizador, estadoResgate} = require("../models/association/associations");

const getRedemptionCode = async () => {
  try {
    const redemptionCode = await resgateCodigo.findAll({
      include: [
        { model: Produto },
        { model: Utilizador }, 
        { model: estadoResgate }
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

module.exports = { getRedemptionCode, createRedemptionCode}