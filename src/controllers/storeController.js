const { poolPromise } = require("../config/db");

const getStores = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM [dbo].[Produto]');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error getting stores in database: ", error);
        res.status(500).json("Internal server error.");
    }
}

module.exports = { getStores };