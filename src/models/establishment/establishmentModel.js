module.exports = (sequelize, DataTypes) => {
  const Estabelecimento = sequelize.define(
    "Estabelecimento",
    {
      idEstabelecimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      telefoneEstabelecimento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailEstabelecimento: {
        type: DataTypes.STRING,
      },
      nomeEstabelecimento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Estabelecimento",
      timestamps: false,
    }
  );

  return Estabelecimento;
};
