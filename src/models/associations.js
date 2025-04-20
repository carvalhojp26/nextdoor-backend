const { sequelize, DataTypes } = require("../config/db");

const Utilizador = require("./userModel")(sequelize, DataTypes);
const Endereco = require("./addressModel")(sequelize, DataTypes);
const Vizinhanca = require("./neighborhoodModel")(sequelize, DataTypes);
const estadoUtilizador = require("./userStateModel")(sequelize, DataTypes);
const tipoUtilizador = require("./userTypeModel")(sequelize, DataTypes);

Utilizador.belongsTo(Endereco, {
  foreignKey: "EnderecoidEndereco",
});

Utilizador.belongsTo(Vizinhanca, {
  foreignKey: "VizinhançaidVizinhança",
});

Utilizador.belongsTo(estadoUtilizador, {
  foreignKey: "estadoUtilizadoridEstadoUtilizador",
});

Utilizador.belongsTo(tipoUtilizador, {
  foreignKey: "tipoUtilizadoridTipoUtilizador",
});

module.exports = {
  sequelize,
  Utilizador,
  Endereco,
  Vizinhanca,
  estadoUtilizador,
  tipoUtilizador,
};
