module.exports = (sequelize, DataTypes) => {
  const estadoResgate = sequelize.define(
    "estadoResgate",
    {
      idEstadoResgate: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      estadoResgate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "estadoResgate",
      timestamps: false,
    }
  );

  return estadoResgate;
};
