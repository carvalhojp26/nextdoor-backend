const {
  criacaoTarefa,
  Utilizador,
  categoriaTarefa,
  estadoCriacaoTarefa
} = require("../models/associations");

const getTaskCreation = async () => {
  try {
    const tasks = await CriacaoTarefa.findAll({
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
      where: { idTarefaCriada },
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
  getTaskCreation,
  createTaskCreation,
  deleteTaskCreation,
  updateTaskCreation
};
