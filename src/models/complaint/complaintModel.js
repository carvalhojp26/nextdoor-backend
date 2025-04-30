module.exports = (sequelize, DataTypes) => {
    const Denuncia = sequelize.define(
        "Denuncia",
        {
          idDenuncia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          comentario: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          dataDenuncia: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          },         
        },
        {
          tableName: "Denuncia",
          timestamps: false,
        }
      );
      return Denuncia;
    };
    