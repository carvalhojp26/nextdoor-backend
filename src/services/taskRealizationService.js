const {
    realizacaoTarefa,
    criacaoTarefa,
    Utilizador,
    estadoRealizacaoTarefa,
    Vizinhanca
} = require("../models/association/associations");

const getTasksRealization = async (userId) => {
    try {
        const tasks = await realizacaoTarefa.findAll({
            where: { UtilizadoridUtilizador: userId},
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

const getTasksRealizationByUser = async (userId, neighborhoodId) => {
    try {
        const tasks = await realizacaoTarefa.findAll({
            where: { UtilizadoridUtilizador: userId},
            include: [
                { model: criacaoTarefa },
                { model: estadoRealizacaoTarefa },
                { model: Utilizador,
                    where: { VizinhançaidVizinhança: neighborhoodId}
                 }
            ]
        })

        return tasks
    } catch (error) {
        console.error("Error fetching tasks realizations in database: ", error);
        throw error;
    }
}

const createTaskRealization = async (data) => {
    try {
      const newTask = await realizacaoTarefa.create(data);
      return newTask;
    } catch (error) {
      console.error("Error creating task realization:", error);
      throw error;
    }
  };

const deleteTaskRealization = async (taskRealizationId, userId) => {
    try {
        const deleted = await realizacaoTarefa.destroy({
            where: { idRealizacaoTarefa: taskRealizationId, UtilizadoridUtilizador: userId }
        });

        return deleted
    } catch (error) {
        console.error("Error deleting task realization: ", error);
        throw error;
    }
}

module.exports = {
    getTasksRealization, getTasksRealizationByUser, createTaskRealization, deleteTaskRealization
}