module.exports = (sequelize, DataTypes) => {
  const resgateCodigo = sequelize.define(
    "resgateCodigo",
    {
      idResgate: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dataResgate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      tableName: "resgateCodigo",
      timestamps: false,
    }
  );

  return resgateCodigo;
};
