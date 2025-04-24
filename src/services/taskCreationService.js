const {
  criacaoTarefa,
  Utilizador,
  categoriaTarefa,
  estadoCriacaoTarefa
} = require("../models/associations");

const getTaskCreationById = async (id) => {
  try {
    const task = await criacaoTarefa.findOne({
      where: { idTarefaCriada: id },
      include: [
        { model: Utilizador },
        { model: categoriaTarefa },
        { model: estadoCriacaoTarefa }
      ],
    });
    
    return task;
  } catch (error) {
    console.error("Error fetching task by ID from database:", error);
    throw error;
  }
};

const getTaskCreationByCategory = async (categoryId) => {
  try {
    const task = await criacaoTarefa.findAll({
      where: { categoriaTarefaidCategoriaTarefa: categoryId },
      include: [
        { model: Utilizador },
        { model: categoriaTarefa },
        { model: estadoCriacaoTarefa }
      ],
    });

    return task;
  } catch (error) {
    console.error("Error fetching task by category from database:", error);
    throw error;
  }
};

const getTaskCreationByUser = async (userId) => {
  try {
    const task = await criacaoTarefa.findAll({
      where: { UtilizadoridUtilizador: userId },
      include: [
        { model: Utilizador },
        { model: categoriaTarefa },
        { model: estadoCriacaoTarefa }
      ],
    });

    return task;
  } catch (error) {
    console.error("Error fetching task by user from database:", error);
    throw error;
  }
};

const getTaskCreation = async () => {
  try {
    const tasks = await criacaoTarefa.findAll({
      include: [
        { model: Utilizador },
        { model: categoriaTarefa },
        { model: estadoCriacaoTarefa }
      ]
    });

    return tasks;
  } catch (error) {
    console.error("Error fetching task creation list:", error);
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

const updateTaskCreation = async (idTarefaCriada, updateFields) => {
  try {
    const [updatedRows] = await criacaoTarefa.update(updateFields, {
      where: { idTarefaCriada: idTarefaCriada },
    });
    return updatedRows;
  } catch (error) {
    console.error("Error updating task creation:", error);
    throw error;
  }
};


const deleteTaskCreation = async (idTarefaCriada) => {
  try {
    const deleted = await criacaoTarefa.destroy({
      where: { idTarefaCriada },
    });

    return deleted;
  } catch (error) {
    console.error("Error deleting task creation:", error);
    throw error;
  }
};


module.exports = {
  getTaskCreationByUser,
  getTaskCreationByCategory,
  getTaskCreationById,
  getTaskCreation,
  createTaskCreation,
  deleteTaskCreation,
  updateTaskCreation
};
