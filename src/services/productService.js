const { poolPromise } = require("../config/db");

const getProducts = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM [dbo].[Produto]");
    return result.recordset;
  } catch (error) {
    console.error("Error getting products from database:", error);
    throw error;
  }
};

module.exports = { getProducts };
