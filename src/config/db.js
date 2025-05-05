const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
console.log("DB_SERVER:", process.env.DB_SERVER);

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    dialect: "mssql",
    dialectOptions: {
      options: {
        trustServerCertificate: true,
      },
    },
  }
);

module.exports = { sequelize, DataTypes };
