const { sequelize, DataTypes } = require("../../config/db");

const Utilizador = require("../user/userModel")(sequelize, DataTypes);
const categoriaTarefa = require("../taskCreation/taskCreationCategoryModel")(sequelize, DataTypes);
const estadoCriacaoTarefa = require("../taskCreation/taskCreationStateModel")(sequelize, DataTypes);
const Endereco = require("../address/addressModel")(sequelize, DataTypes);
const Vizinhanca = require("../neighborhood/neighborhoodModel")(sequelize, DataTypes);
const estadoUtilizador = require("../user/userStateModel")(sequelize, DataTypes);
const tipoUtilizador = require("../user/userTypeModel")(sequelize, DataTypes);
const Denuncia = require("../complaint/complaintModel")(sequelize, DataTypes);
const Notificacao = require("../notification/notificationModel")(sequelize, DataTypes);
const criacaoTarefa = require("../taskCreation/taskCreationModel")(sequelize, DataTypes);
const Estabelecimento = require("../establishment/establishmentModel")(sequelize, DataTypes);
const estadoProduto = require("../products/productState")(sequelize, DataTypes);
const tipoProduto = require("../products/productTypeModel")(sequelize, DataTypes);
const Produto = require("../products/productModel")(sequelize, DataTypes);
const resgateCodigo = require("../redemptionCode/redemptionCodeModel")(sequelize, DataTypes);
const estadoResgate = require("../redemptionCode/redemptionStateModel")(sequelize, DataTypes);
const realizacaoTarefa = require("../taskRealization/taskRealizationModel")(sequelize, DataTypes);
const estadoRealizacaoTarefa = require("../taskRealization/taskRealizationStateModel")(sequelize, DataTypes);
const feedbackAvaliacao = require("../feedback/feedbackModel")(sequelize, DataTypes);
//const tipoProduto  = require("../typeProduct/typeProduct")(sequelize, DataTypes); // Caminho relativo a partir de associations.js

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


criacaoTarefa.belongsTo(Utilizador, {
  foreignKey: "UtilizadoridUtilizador",
});

criacaoTarefa.belongsTo(categoriaTarefa, {
  foreignKey: "categoriaTarefaidCategoriaTarefa",
});

criacaoTarefa.belongsTo(estadoCriacaoTarefa, {
  foreignKey: "estadoCriacaoTarefaidEstadoCriacaoTarefa",
});

Produto.belongsTo(Estabelecimento, {
  foreignKey: "EstabelecimentoidEstabelecimento",
  as: 'Estabelecimento'
});

Produto.belongsTo(estadoProduto, {
  foreignKey: "estadoProdutoidEstadoProduto",
  as: 'estadoProduto'
});

Produto.belongsTo(tipoProduto, {
  foreignKey: "tipoProdutoidTipoProduto",
  as: 'tipoProduto'
});

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

Notificacao.belongsTo(realizacaoTarefa, {
  foreignKey: "realizacaoTarefaidRealizacaoTarefa",
});

realizacaoTarefa.belongsTo(criacaoTarefa, {
   foreignKey: "criacaoTarefaidTarefaCriada"
});
realizacaoTarefa.belongsTo(Utilizador, { 
  foreignKey: "UtilizadoridUtilizador"
});
realizacaoTarefa.belongsTo(estadoRealizacaoTarefa, { 
  foreignKey: "estadoRealizacaoTarefaidEstadoRealizacaoTarefa"
});

Estabelecimento.belongsTo(Endereco, {
  foreignKey: "EnderecoidEndereco"
});

Estabelecimento.belongsTo(Vizinhanca, {
  foreignKey: "VizinhancaidVizinhanca"
});

feedbackAvaliacao.belongsTo(criacaoTarefa, {
  foreignKey: "criacaoTarefaidTarefaCriada"
});

feedbackAvaliacao.belongsTo(realizacaoTarefa, {
  foreignKey: "RealizacaoTarefaidRealizacaoTarefa"
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
  categoriaTarefa,
  estadoCriacaoTarefa,
  Produto,
  Estabelecimento,
  estadoProduto,
  tipoProduto,
  resgateCodigo,
  estadoResgate,
  realizacaoTarefa,
  estadoRealizacaoTarefa,
  feedbackAvaliacao
};
