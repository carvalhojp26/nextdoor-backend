const {
  criacaoTarefa,
  Utilizador,
  categoriaTarefa,
  estadoCriacaoTarefa,
  Endereco,
} = require("../models/association/associations");

const userService = require("./userService");
const categoryService = require("../services/categoryService");
//Admin
const getAllTaskCreation = async () => {
  try {
    const tasks = await criacaoTarefa.findAll({
      include: [
        { model: Utilizador, include: [{ model: Endereco }] },
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

//My tasks
const getTasksCreation = async (userId) => {
  try {
    const tasks = await criacaoTarefa.findAll({
      where: {
        UtilizadoridUtilizador: userId,
        estadoCriacaoTarefaidEstadoCriacaoTarefa: 1,
      },
      include: [
        { model: Utilizador, include: [{ model: Endereco }] },
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
      where: {
        idTarefaCriada: taskCreationId,
        estadoCriacaoTarefaidEstadoCriacaoTarefa: 1,
      },
      include: [
        {
          model: Utilizador,
          where: {
            VizinhançaidVizinhança: neighborhoodId,
          },
          include: [{ model: Endereco }],
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
      where: { estadoCriacaoTarefaidEstadoCriacaoTarefa: 1 },
      include: [
        {
          model: Utilizador,
          where: {
            VizinhançaidVizinhança: neighborhoodId,
          },
          include: [{ model: Endereco }],
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
      where: {
        categoriaTarefaidCategoriaTarefa: categoryId,
        estadoCriacaoTarefaidEstadoCriacaoTarefa: 1,
      },
      include: [
        {
          model: Utilizador,
          where: {
            VizinhançaidVizinhança: neighborhoodId,
          },
          include: [{ model: Endereco }],
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
  const { UtilizadoridUtilizador, categoriaTarefaidCategoriaTarefa, ...rest } =
    data;

  const user = await userService.getUser(UtilizadoridUtilizador);

  const categoria = await categoryService.getCategoryById(
    categoriaTarefaidCategoriaTarefa
  );
  if (!categoria) throw new Error("Task category not found");

  const necessaryPoints = categoria.pontosCategoria;

  if (user.pontosUtilizador < necessaryPoints) {
    throw new Error("Utilizador não tem pontos suficientes");
  }

  const updated = await userService.updateUser(UtilizadoridUtilizador, {
    pontosUtilizador: user.pontosUtilizador - necessaryPoints,
  });
  if (!updated) throw new Error("Erro ao atualizar pontos do utilizador");

  const newTask = await criacaoTarefa.create({
    ...rest,
    UtilizadoridUtilizador,
    categoriaTarefaidCategoriaTarefa,
    estadoCriacaoTarefaidEstadoCriacaoTarefa: 1,
  });
  return newTask;
};

const updateTaskCreation = async (taskCreationId, updateFields) => {
  try {
    const [updatedRows] = await criacaoTarefa.update(updateFields, {
      where: { idTarefaCriada: taskCreationId },
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
