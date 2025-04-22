module.exports = (sequelize, DataTypes) => {
    const categoriaTarefa = sequelize.define(
      "categoriaTarefa",
      {
        idCategoriaTarefa: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        categoriaTarefa: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pontosCategoria: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: "categoriaTarefa",
        timestamps: false,
      }
    );
  
    return categoriaTarefa;
  };
  