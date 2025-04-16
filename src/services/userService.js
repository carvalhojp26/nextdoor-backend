const { poolPromise } = require("../config/db");

const getUsers = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM [dbo].[Utilizador];');
        return result.recordset;
    } catch (error) {
        console.error("Error getting users in database: ", error);
        res.status(500).json({ error: "Internal server error"});
    }
}

module.exports = { getUsers }