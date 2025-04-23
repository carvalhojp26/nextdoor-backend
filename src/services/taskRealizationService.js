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

const createTaskRealization = async (data) => {
    try {
      const newTask = await realizacaoTarefa.create(data);
      return newTask;
    } catch (error) {
      console.error("Error creating task realization:", error);
      throw error;
    }
  };

const deleteTaskRealization = async (idRealizacaoTarefa) => {
    try {
        const deleted = await realizacaoTarefa.destroy({
            where: { idRealizacaoTarefa }
        });

        return deleted
    } catch (error) {
        console.error("Error deleting task realization: ", error);
        throw error;
    }
}

module.exports = {
    getTaskRealization, createTaskRealization, deleteTaskRealization
}