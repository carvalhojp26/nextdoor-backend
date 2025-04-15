const { poolPromise } = require("../config/db");

const getUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM [dbo].[Utilizador];');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error fetching users in database: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getUsers };