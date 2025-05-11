const {
  realizacaoTarefa,
  criacaoTarefa,
  Utilizador,
  estadoRealizacaoTarefa,
  categoriaTarefa,
  Endereco,
} = require("../models/association/associations");

const getTasksInRealization = async (userId) => {
  try {
    const tasks = await realizacaoTarefa.findAll({
      where: {
        UtilizadoridUtilizador: userId,
        estadoRealizacaoTarefaidEstadoRealizacaoTarefa: 3,
      }, //em execução/realização
      include: [
        {
          model: criacaoTarefa,
          include: [
            { model: categoriaTarefa },
            { model: Utilizador, include: [{ model: Endereco }] },
          ],
        },
        { model: estadoRealizacaoTarefa },
        { model: Utilizador },
      ],
    });

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks realizations in database: ", error);
    throw error;
  }
};

const getTasksRealizeted = async (userId) => {
  try {
    const tasks = await realizacaoTarefa.findAll({
      where: {
        UtilizadoridUtilizador: userId,
        estadoRealizacaoTarefaidEstadoRealizacaoTarefa: 4,
      }, //tarefas concluídas
      include: [
        { model: criacaoTarefa },
        { model: estadoRealizacaoTarefa },
        { model: Utilizador },
      ],
    });

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks realizations in database: ", error);
    throw error;
  }
};

const getTasksRealizationByUser = async (userId, neighborhoodId) => {
  try {
    const tasks = await realizacaoTarefa.findAll({
      where: { UtilizadoridUtilizador: userId },
      include: [
        { model: criacaoTarefa },
        { model: estadoRealizacaoTarefa },
        {
          model: Utilizador,
          where: { VizinhançaidVizinhança: neighborhoodId },
        },
      ],
    });

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks realizations in database: ", error);
    throw error;
  }
};

const createTaskRealization = async (data) => {
  try {
    const newTask = await realizacaoTarefa.create(data);
    return newTask;
  } catch (error) {
    console.error("Error creating task realization:", error);
    throw error;
  }
};

const updateTaskRealization = async (
  taskRealizationId,
  updatedFields,
  userId
) => {
  try {
    const [updatedRows] = await realizacaoTarefa.update(updatedFields, {
      where: {
        idRealizacaoTarefa: taskRealizationId,
        UtilizadoridUtilizador: userId,
      },
    });
    return updatedRows;
  } catch (error) {
    console.error("Error updating task creation:", error);
    throw error;
  }
};

const deleteTaskRealization = async (taskRealizationId, userId) => {
  try {
    const deleted = await realizacaoTarefa.destroy({
      where: {
        idRealizacaoTarefa: taskRealizationId,
        UtilizadoridUtilizador: userId,
      },
    });

    return deleted;
  } catch (error) {
    console.error("Error deleting task realization: ", error);
    throw error;
  }
};

module.exports = {
  getTasksInRealization,
  getTasksRealizeted,
  getTasksRealizationByUser,
  createTaskRealization,
  updateTaskRealization,
  deleteTaskRealization,
};
