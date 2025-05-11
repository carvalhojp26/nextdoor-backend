module.exports = (sequelize, DataTypes) => {
    const estadoRealizacaoTarefa = sequelize.define(
        "EstadoRealizacaoTarefa",
        {
            idEstadoRealizacaoTarefa: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            estadoRealizacaoTarefa: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: "estadoRealizacaoTarefa",
            timestamps: false
        }
    );

    return estadoRealizacaoTarefa;
}