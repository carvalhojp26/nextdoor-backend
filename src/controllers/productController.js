const { poolPromise } = require("../config/db");

const getProducts = async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request().query('SELECT * FROM [dbo].[Produto];');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error getting products from database: ", error);
        res.status(500).json("Internal server error");
    };
};

module.exports = { getProducts };