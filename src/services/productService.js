const { poolPromise } = require("../config/db");

const getProducts = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM [dbo].[Produto]');
        return result.recordset;
    } catch (error) {
        console.error("Error getting products in database: ", error);
        res.status(500).json({ error: "Internal server error"});
    }
}

module.exports = { getProducts };