module.exports = (sequelize, DataTypes) => {
    const Notificacao = sequelize.define(
        "Notificacao",
        {
          idNotificacao: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          mensagem: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          dataEnvio: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          },
        },
        {
          tableName: "Notificacao",
          timestamps: false,
        }
      );
      return Notificacao;
    };
    