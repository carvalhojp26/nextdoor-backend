module.exports = (sequelize, DataTypes) => {
  const tipoUtilizador = sequelize.define(
    "tipoUtilizador",
    {
      idTipoUtilizador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipoUtilizador: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tipoUtilizador",
      timestamps: false,
    }
  );

  return tipoUtilizador;
};
