module.exports = (sequelize, DataTypes) => {
  const Vizinhanca = sequelize.define(
    "Vizinhanca",
    {
      idVizinhanca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomeFreguesia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Vizinhanca",
      timestamps: false,
    }
  );

  return Vizinhanca;
};
