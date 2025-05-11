// Exemplo em: src/models/products/productTypeModel.js
module.exports = (sequelize, DataTypes) => {
  const TipoProduto = sequelize.define('TipoProduto', {
    idTipoProduto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipoProduto: { // Usando o nome da coluna do BD diretamente como propriedade
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
    // Ou se preferir nomeTipoProduto no código JS:
    // nomeTipoProduto: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   field: 'tipoProduto'
    // }
  }, {
    tableName: 'TipoProduto', // Confirme o nome exato da tabela
    timestamps: false
  });
  return TipoProduto;
};