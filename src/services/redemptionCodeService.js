const { resgateCodigo, Produto, Utilizador, estadoResgate} = require("../models/associations");

const getRedemptionCodes = async () => {
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

const insertRedemptionCode = async (body) => {
  try {
    const redemptionCode = await resgateCodigo.create(body);
    return redemptionCode;
  } catch (error) {
    console.error("Error adding redemption code in database:", error);
    throw error;
  }
};

module.exports = { getRedemptionCodes, insertRedemptionCode}