const { criacaoTarefa, Utilizador, categoriaTarefa, estadoCriacaoTarefa } = require("../models/associations");

const getTaskCreation = async () => {
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
    console.error("Error getting taskCreation in database: ", error);
    throw error;
  }
};

module.exports = {
  getTaskCreation,
};
