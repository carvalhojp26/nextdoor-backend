module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    "Produto",
    {
      idProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomeProduto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precoProduto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      descricaoProduto: {
        type: DataTypes.STRING,
        allowNull: false
        
      },
      imagemProduto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stockProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      tableName: "Produto",
      timestamps: false,
    }
  );

  return Produto;
};
