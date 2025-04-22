module.exports = (sequelize, DataTypes) => {
    const criacaoTarefa = sequelize.define(
      "CriacaoTarefa",
      {
        idTarefaCriada: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nomeTarefa: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dataInicio: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        dataFim: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        descricaoTarefa: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        UtilizadoridUtilizador: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        categoriaTarefaidCategoriaTarefa: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        estadoCriacaoTarefaidEstadoCriacaoTarefa: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: "criacaoTarefa",
        timestamps: false,
      }
    );
  
    return criacaoTarefa;
  };
  