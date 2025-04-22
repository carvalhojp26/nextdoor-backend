const {
    realizacaoTarefa,
    criacaoTarefa,
    Utilizador,
    estadoRealizacaoTarefa
} = require("../models/associations");

const getTaskRealization = async () => {
    try {
        const tasks = await realizacaoTarefa.findAll({
            include: [
                { model: criacaoTarefa },
                { model: estadoRealizacaoTarefa },
                { model: Utilizador }
            ]
        })

        return tasks
    } catch (error) {
        console.error("Error fetching tasks realizations in database: ", error);
        throw error;
    }
}

module.exports = {
    getTaskRealization
}