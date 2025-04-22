module.exports = (sequelize, DataTypes) => {
    const estadoCriacaoTarefa = sequelize.define(
      "estadoCriacaoTarefa",
      {
        idEstadoCriacaoTarefa: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        estadoCriacaoTarefa: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "estadoCriacaoTarefa",
        timestamps: false,
      }
    );
  
    return estadoCriacaoTarefa;
  };
  