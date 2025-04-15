const sql = require("mssql");
require("dotenv").config();

const config = {
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    authentication: {
        type: "ntlm",
        options: {
            domain: "",
            username: process.env.DB_USERNAME,
            password: ""
        }
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on("error", error => {
    console.error("Error connecting to SQL Server");
});

module.exports = {
    sql,
    poolConnect,
    pool
};