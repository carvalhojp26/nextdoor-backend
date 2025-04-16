const { poolPromise } = require("../config/db");

const getStores = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM [dbo].[Estabelecimento]');
        return result.recordset;
    } catch (error) {
        console.error("Error getting stores in database: ", error);
        res.status(500).json({ error: "Internal server error"});
    }
}

module.exports = { getStores };