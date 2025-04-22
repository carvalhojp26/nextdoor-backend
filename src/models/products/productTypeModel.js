module.exports = (sequelize, DataTypes) => {
  const tipoProduto = sequelize.define(
    "tipoProduto",
    {
      idTipoProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipoProduto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tipoProduto",
      timestamps: false,
    }
  );

  return tipoProduto;
};
