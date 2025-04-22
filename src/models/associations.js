const { sequelize, DataTypes } = require("../config/db");

const Utilizador = require("./users/userModel")(sequelize, DataTypes);
const criacaoTarefa = require("./taskCreation/taskCreationModel")(sequelize, DataTypes);
const categoriaTarefa = require("./taskCreation/taskCreationCategoryModel")(sequelize, DataTypes);
const estadoCriacaoTarefa = require("./taskCreation/taskCreationStateModel")(sequelize, DataTypes);
const Endereco = require("./addressModel")(sequelize, DataTypes);
const Vizinhanca = require("./neighborhoodModel")(sequelize, DataTypes);
const estadoUtilizador = require("./users/userStateModel")(sequelize, DataTypes);
const tipoUtilizador = require("./users/userTypeModel")(sequelize, DataTypes);

// User

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


// Task Creation

criacaoTarefa.belongsTo(Utilizador, {
  foreignKey: "UtilizadoridUtilizador",
});

criacaoTarefa.belongsTo(categoriaTarefa, {
  foreignKey: "categoriaTarefaidCategoriaTarefa",
});

criacaoTarefa.belongsTo(estadoCriacaoTarefa, {
  foreignKey: "estadoCriacaoTarefaidEstadoCriacaoTarefa",
});


module.exports = {
  sequelize,
  Utilizador,
  Endereco,
  Vizinhanca,
  estadoUtilizador,
  tipoUtilizador,
  criacaoTarefa,
  categoriaTarefa,
  estadoCriacaoTarefa,
};
