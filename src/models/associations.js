const { sequelize, DataTypes } = require("../config/db");

const Utilizador = require("./users/userModel")(sequelize, DataTypes);
const Endereco = require("./addressModel")(sequelize, DataTypes);
const Vizinhanca = require("./neighborhoodModel")(sequelize, DataTypes);
const estadoUtilizador = require("./users/userStateModel")(sequelize, DataTypes);
const tipoUtilizador = require("./users/userTypeModel")(sequelize, DataTypes);
const Denuncia = require("../models/complaintModel")(sequelize, DataTypes);

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

Denuncia.belongsTo(Utilizador, {
  foreignKey: "UtilizadoridUtilizador",
});

module.exports = {
  sequelize,
  Utilizador,
  Endereco,
  Vizinhanca,
  estadoUtilizador,
  tipoUtilizador,
  Denuncia
};
