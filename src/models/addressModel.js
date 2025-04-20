module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define(
    "Endereco",
    {
      idEndereco: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numeroPorta: DataTypes.INTEGER,
      distrito: DataTypes.STRING,
      freguesia: DataTypes.STRING,
      codigoPostal: DataTypes.STRING,
      rua: DataTypes.STRING,
    },
    {
      tableName: "Endereco",
      timestamps: false,
    }
  );

  return Endereco;
};
