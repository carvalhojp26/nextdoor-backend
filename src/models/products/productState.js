module.exports = (sequelize, DataTypes) => {
  const estadoProduto = sequelize.define(
    "productState",
    {
      idEstadoProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      estadoProduto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "estadoProduto",
      timestamps: false,
    }
  );

  return estadoProduto;
};
