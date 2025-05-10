const taskCreationService = require("../services/taskCreationService");
const userService = require("../services/userService");

//Admin
const getAllTaskCreationController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const tasks = await taskCreationService.getAllTaskCreation();
    res
      .status(200)
      .json({ message: "Tasks fetched successfully", task: tasks });
  } catch (error) {
    res.status(500).json({ error: "Error getting taskCreation" });
  }
};

const getTasksCreationController = async (req, res) => {
  const userId = req.user.idUtilizador;
  try {
    const tasks = await taskCreationService.getTasksCreation(userId);
    res
      .status(200)
      .json({ message: "Tasks fetched successfully", task: tasks });
  } catch (error) {
    res.status(500).json({ error: "Error getting taskCreation" });
  }
};

const getTaskCreationByIdController = async (req, res) => {
  const { taskCreationId } = req.params;
  const userId = req.user.idUtilizador;
  try {
    const findUser = await userService.getUser(userId);
    const neighborhoodId = findUser.VizinhançaidVizinhança;
    const task = await taskCreationService.getTaskCreationById(
      taskCreationId,
      neighborhoodId
    );
    res.status(200).json({ message: "Task fetched successfully", task: task });
  } catch (error) {
    res.status(500).json({ error: "Task not found" });
  }
};

const getTasksCreationByCategoryController = async (req, res) => {
  const { categoryId } = req.params;
  const userId = req.user.idUtilizador;
  try {
    const findUser = await userService.getUser(userId);
    const neighborhoodId = findUser.VizinhançaidVizinhança;
    const task = await taskCreationService.getTasksCreationByCategory(
      categoryId,
      neighborhoodId
    );
    res.status(200).json({ message: "Task fetched successfully", task: task });
  } catch (error) {
    res.status(500).json({ error: "Task not found" });
  }
};

const getTasksCreationByNeighborhoodController = async (req, res) => {
  const userId = req.user.idUtilizador;
  try {
    const findUser = await userService.getUser(userId);
    const neighborhoodId = findUser.VizinhançaidVizinhança;
    const task = await taskCreationService.getTasksCreationByNeighborhood(
      neighborhoodId
    );
    res.status(200).json({ message: "Task fetched successfully", task: task });
  } catch (error) {
    res.status(500).json({ error: "Task not found" });
  }
};

const createTaskCreationController = async (req, res) => {
  const {
    nomeTarefa,
    dataInicio,
    dataFim,
    categoriaTarefaidCategoriaTarefa,
    descricaoTarefa,
  } = req.body;

  const userId = req.user.idUtilizador;
  
  if (
    !nomeTarefa ||
    !categoriaTarefaidCategoriaTarefa
  ) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  
  if (nomeTarefa.length > 100) {
    return res.status(400).json({ error: "Task name needs to have less than 100 characters" });
  }
  
  const startDate = new Date(dataInicio);
  const endDate = new Date(dataFim);
  
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({ error: "Invalid date format." });
  }
  
  if (startDate > endDate) {
    return res
    .status(400)
    .json({ error: "Start date must be before or equal to end date." });  
  }
  
  try {
    const newTask = await taskCreationService.createTaskCreation({
      nomeTarefa,
      dataInicio,
      dataFim,
      descricaoTarefa,
      UtilizadoridUtilizador: userId,
      categoriaTarefaidCategoriaTarefa,
    });

    res
      .status(201)
      .json({ message: "Task successfully created", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Error creating task" });

  }
};

const updateTaskCreationController = async (req, res) => {
  const { taskCreationId } = req.params;
  const updateFields = req.body;

  try {
    if (updateFields.dataInicio && updateFields.dataFim) {
      const startDate = new Date(updateFields.dataInicio);
      const endDate = new Date(updateFields.dataFim);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format." });
      }

      if (startDate > endDate) {
        return res
          .status(400)
          .json({ error: "Start date must be before or equal to end date." });
      }
    }

    const updated = await taskCreationService.updateTaskCreation(
      taskCreationId,
      updateFields,
    );

    if (updated === 0) {
      return res
        .status(404)
        .json({ error: "Task not found or no changes made." });
    }

    res.status(200).json({ message: "Task successfully updated" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
};

const deleteTaskCreationController = async (req, res) => {
  const userId = req.user.idUtilizador;
  const { taskCreationId } = req.params;

  try {
    const deleted = await taskCreationService.deleteTaskCreation(
      taskCreationId,
      userId
    );

    if (deleted === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task successfully deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
};

module.exports = {
  getAllTaskCreationController,
  getTasksCreationController,
  getTasksCreationByCategoryController,
  getTaskCreationByIdController,
  getTasksCreationByNeighborhoodController,
  createTaskCreationController,
  updateTaskCreationController,
  deleteTaskCreationController,
};
