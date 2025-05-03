module.exports = (sequelize, DataTypes) => {
  const estadoUtilizador = sequelize.define(
    "estadoUtilizador",
    {
      idEstadoUtilizador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      estadoUtilizador: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "estadoUtilizador",
      timestamps: false,
    }
  );

  return estadoUtilizador;
};
