module.exports = (sequelize, DataTypes) => {
  const Utilizador = sequelize.define(
    "Utilizador",
    {
      idUtilizador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomeUtilizador: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      pontosUtilizador: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      comprovativoResidencia: {
        type: DataTypes.STRING,
      },
      emailUtilizador: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Utilizador",
      timestamps: false,
    }
  );

  Utilizador.associate = (models) => {
    Utilizador.belongsTo(models.Vizinhanca, {
      foreignKey: "VizinhancaidVizinhanca",
    });

    Utilizador.belongsTo(models.Endereco, {
      foreignKey: "EnderecoidEndereco",
    });

    Utilizador.belongsTo(models.EstadoUtilizador, {
      foreignKey: "estadoUtilizadoridEstadoUtilizador",
    });

    Utilizador.belongsTo(models.TipoUtilizador, {
      foreignKey: "tipoUtilizadoridTipoUtilizador",
    });
  };

  return Utilizador;
};
