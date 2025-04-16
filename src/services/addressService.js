const { poolPromise } = require("../config/db");

const getAddress = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM [dbo].[Endereco]");
        return result.recordset;
      } catch (error) {
        console.error("Error getting adresses in database: ", error);
        res.status(500).json("Internal server error.");
      }
}

module.exports = { getAddress }