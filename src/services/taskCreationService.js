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

module.exports = {
  getTaskCreation,
  createTaskCreation
};
