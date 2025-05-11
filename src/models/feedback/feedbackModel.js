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
        allowNull: true,
      },
      pontuacao:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "feedbackAvaliacao",
      timestamps: false,
    }
  )
  return feedbackAvaliacao;
};