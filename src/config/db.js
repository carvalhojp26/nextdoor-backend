const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Utilizador = require("../models/userModel")(sequelize, DataTypes);
db.Endereco = require("../models/addressModel")(sequelize, DataTypes);
db.Vizinhanca = require("../models/neighborhoodModel")(sequelize, DataTypes);
db.estadoUtilizador = require("../models/userStateModel")(sequelize, DataTypes);
db.tipoUtilizador = require("../models/userTypeModel")(sequelize, DataTypes);

db.Utilizador.belongsTo(db.Endereco, {
  foreignKey: "EnderecoidEndereco",
});
db.Utilizador.belongsTo(db.Vizinhanca, {
  foreignKey: "VizinhançaidVizinhança",
});
db.Utilizador.belongsTo(db.estadoUtilizador, {
  foreignKey: "estadoUtilizadoridEstadoUtilizador",
});
db.Utilizador.belongsTo(db.tipoUtilizador, {
  foreignKey: "tipoUtilizadoridTipoUtilizador",
});

module.exports = db;
