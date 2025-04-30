const {
  criacaoTarefa,
  Utilizador,
  categoriaTarefa,
  estadoCriacaoTarefa,
} = require("../models/association/associations");

//Admin
const getAllTaskCreation = async () => {
  try {
    const tasks = await criacaoTarefa.findAll({
      include: [
        { model: Utilizador },
        { model: categoriaTarefa },
        { model: estadoCriacaoTarefa },
      ],
    });

    return tasks;
  } catch (error) {
    console.error("Error fetching task creation list:", error);
    throw error;
  }
};

const getTasksCreation = async (userId) => {
  try {
    const tasks = await criacaoTarefa.findAll({
      where: { UtilizadoridUtilizador: userId }, 
      include: [
        { model: Utilizador },
        { model: categoriaTarefa },
        { model: estadoCriacaoTarefa },
      ],
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching task creation list:", error);
    throw error;
  }
};


const getTaskCreationById = async (taskCreationId, neighborhoodId) => {
  try {
    const task = await criacaoTarefa.findOne({
      where: { idTarefaCriada: taskCreationId },
      include: [
        {
          model: Utilizador,
          where: {
            VizinhançaidVizinhança: neighborhoodId,
          },
        },
        { model: categoriaTarefa },
        { model: estadoCriacaoTarefa },
      ],
    });
    
    return task;
  } catch (error) {
    console.error("Error fetching task by ID from database:", error);
    throw error;
  }
};

const getTasksCreationByNeighborhood = async (neighborhoodId) => {
  try {
    const tasks = await criacaoTarefa.findAll({
      include: [
        {
          model: Utilizador,
          where: {
            VizinhançaidVizinhança: neighborhoodId,
          },
        },
        { model: categoriaTarefa },
        { model: estadoCriacaoTarefa },
      ],
    });

    return tasks;
  } catch (error) {
    console.error("Error fetching task creation list:", error);
    throw error;
  }
};

const getTasksCreationByCategory = async (categoryId, neighborhoodId) => {
  try {
    const task = await criacaoTarefa.findAll({
      where: { categoriaTarefaidCategoriaTarefa: categoryId },
      include: [
        {
          model: Utilizador,
          where: {
            VizinhançaidVizinhança: neighborhoodId,
          },
        },
        { model: categoriaTarefa },
        { model: estadoCriacaoTarefa },
      ],
    });

    return task;
  } catch (error) {
    console.error("Error fetching task by category from database:", error);
    throw error;
  }
};



const createTaskCreation = async (data) => {
  try {
    const newTask = await criacaoTarefa.create(data);
    return newTask;
  } catch (error) {
    console.error("Error creating task creation:", error);
    throw error;
  }
};

const updateTaskCreation = async (taskCreationId, updateFields, userId) => {
  try {
    const [updatedRows] = await criacaoTarefa.update(updateFields, {
      where: { idTarefaCriada: taskCreationId, UtilizadoridUtilizador: userId},
    });
    return updatedRows;
  } catch (error) {
    console.error("Error updating task creation:", error);
    throw error;
  }
};

const deleteTaskCreation = async (taskCreationId, userId) => {
  try {
    const deleted = await criacaoTarefa.destroy({
      where: { idTarefaCriada: taskCreationId, UtilizadoridUtilizador: userId },
    });

    return deleted;
  } catch (error) {
    console.error("Error deleting task creation:", error);
    throw error;
  }
};

module.exports = {
  getTasksCreationByCategory,
  getTaskCreationById,
  getTasksCreationByNeighborhood,
  getTasksCreation,
  getAllTaskCreation,
  createTaskCreation,
  deleteTaskCreation,
  updateTaskCreation,
};
