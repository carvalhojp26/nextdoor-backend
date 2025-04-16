const { poolPromise } = require("../config/db");

const getTasks = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM [dbo].[criacaoTarefa]');
        return result.recordset;
    } catch (error) {
        console.error("Error getting tasks in database: ", error);
        res.status(500).json({ error: "Internal server error"});
    }
}

module.exports = { getTasks };