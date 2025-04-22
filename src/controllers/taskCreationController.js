const taskCreationService = require("../services/taskCreationService");

const getTaskCreationController = async (req, res) => {
  try {
    const tasks = await taskCreationService.getTaskCreation();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error getting taskCreation" });
  }
};

const createTaskCreationController = async (req, res) => {
    const {
      nomeTarefa,
      dataInicio,
      dataFim,
      UtilizadoridUtilizador,
      categoriaTarefaidCategoriaTarefa,
      estadoCriacaoTarefaidEstadoCriacaoTarefa,
      descricaoTarefa,
    } = req.body;
  
    if (
      !nomeTarefa ||
      !UtilizadoridUtilizador ||
      !categoriaTarefaidCategoriaTarefa ||
      !estadoCriacaoTarefaidEstadoCriacaoTarefa
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }
  
    const startDate = new Date(dataInicio);
    const endDate = new Date(dataFim);
  
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format." });
    }
  
    if (startDate > endDate) {
      return res.status(400).json({ error: "Start date must be before or equal to end date." });
    }
  
    try {
      const newTask = await taskCreationService.createTaskCreation({
        nomeTarefa,
        dataInicio,
        dataFim,
        descricaoTarefa,
        UtilizadoridUtilizador,
        categoriaTarefaidCategoriaTarefa,
        estadoCriacaoTarefaidEstadoCriacaoTarefa,
      });
  
      res.status(201).json({ message: "Task successfully created", task: newTask });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Error creating task" });
    }
  };

module.exports = {
  getTaskCreationController,
  createTaskCreationController
};