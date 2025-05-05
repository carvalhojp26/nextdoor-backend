module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define(
    "Endereco",
    {
      idEndereco: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numeroPorta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      distrito: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      freguesia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codigoPostal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rua: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Endereco",
      timestamps: false,
    }
  );
  return Endereco;
};
