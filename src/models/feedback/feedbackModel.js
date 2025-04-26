module.exports = (sequelize,DataTypes) => {
    const feedbackAvaliacao = sequelize.define(
      "feedbackAvaliacao",
      {
         idAvaliacao: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true,
         },
        comentario:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        pontuacao:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        criacaoTarefaidTarefaCriada:{
           type: DataTypes.INTEGER,
           allowNull: false,
        },
        RealizacaoTarefaidRealizacaoTarefa:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
      },
      {
        tableName: "feedbackAvaliacao",
        timestamps: false,
      }
    )
    return feedbackAvaliacao;
  };