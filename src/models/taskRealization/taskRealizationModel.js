module.exports = (sequelize, DataTypes) => {
    const realizacaoTarefa = sequelize.define(
        "RealizacaoTarefa",
        {
            idRealizacaoTarefa: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            dataRealizacao: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            }, 
            criacaoTarefaidTarefaCriada: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            UtilizadoridUtilizador: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            estadoRealizacaoTarefaidEstadoRealizacaoTarefa: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "realizacaoTarefa",
            timestamps: false
        }
    );

    return realizacaoTarefa
}