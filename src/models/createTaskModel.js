module.exports = (sequelize, DataTypes) => {
    const criacaoTarefa = sequelize.define(
        "criacaoTarefa",
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
            allowNull: false,
          },
          dataFim: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          },     
          descricaoTarefa: {
            type: DataTypes.STRING,
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
    