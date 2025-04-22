const { sequelize, DataTypes } = require("../config/db");

const Utilizador = require("./users/userModel")(sequelize, DataTypes);
const categoriaTarefa = require("./taskCreation/taskCreationCategoryModel")(sequelize, DataTypes);
const estadoCriacaoTarefa = require("./taskCreation/taskCreationStateModel")(sequelize, DataTypes);
const Endereco = require("./addressModel")(sequelize, DataTypes);
const Vizinhanca = require("./neighborhoodModel")(sequelize, DataTypes);
const estadoUtilizador = require("./users/userStateModel")(sequelize, DataTypes);
const tipoUtilizador = require("./users/userTypeModel")(sequelize, DataTypes);
const Denuncia = require("../models/complaintModel")(sequelize, DataTypes);
const Notificacao = require("./notificationModel")(sequelize, DataTypes);
const criacaoTarefa = require("./createTaskModel")(sequelize, DataTypes);

const Estabelecimento = require("./establishmentModel")(sequelize, DataTypes);
const estadoProduto = require("./products/productState")(sequelize, DataTypes);
const tipoProduto = require("./products/productTypeModel")(sequelize, DataTypes);
const Produto = require("./products/productModel")(sequelize, DataTypes);
const resgateCodigo = require("./redemptionCode/redemptionCodeModel")(sequelize, DataTypes);
const estadoResgate = require("./redemptionCode/redemptionStateModel")(sequelize, DataTypes);

//Users associations
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


//Products associations
Produto.belongsTo(Estabelecimento, {
  foreignKey: "EstabelecimentoidEstabelecimento",
});

Produto.belongsTo(estadoProduto, {
  foreignKey: "estadoProdutoidEstadoProduto",
});

Produto.belongsTo(tipoProduto, {
  foreignKey: "tipoProdutoidTipoProduto",
});

//Redemptions associations
resgateCodigo.belongsTo(Produto, {
  foreignKey: "ProdutoidProduto"
});

resgateCodigo.belongsTo(Utilizador, {
  foreignKey: "UtilizadoridUtilizador"
});

resgateCodigo.belongsTo(estadoResgate, {
  foreignKey: "estadoResgateidEstadoResgate"
});

Denuncia.belongsTo(Utilizador, {
  foreignKey: "UtilizadoridUtilizador",
});

Notificacao.belongsTo(Utilizador, {
  foreignKey: "UtilizadoridUtilizador",
});

Notificacao.belongsTo(criacaoTarefa, {
  foreignKey: "criacaoTarefaidTarefaCriada"
})
module.exports = {
  sequelize,
  Utilizador,
  Endereco,
  Vizinhanca,
  estadoUtilizador,
  tipoUtilizador,
  Denuncia,
  criacaoTarefa,
  Notificacao,
  criacaoTarefa,
  categoriaTarefa,
  estadoCriacaoTarefa,
  Produto,
  Estabelecimento,
  estadoProduto,
  tipoProduto,
  resgateCodigo,
  estadoResgate
};
