const taskRealizationService = require("../services/taskRealizationService");

const getTaskRealizationController = async (req, res) => {
  try {
    const realizations = await taskRealizationService.getTaskRealization();
    res.status(200).json(realizations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task realizations" });
  }
};

const createTaskRealizationController = async (req, res) => {
  const {
    dataRealizacao,
    criacaoTarefaidTarefaCriada,
    UtilizadoridUtilizador,
    estadoRealizacaoTarefaidEstadoRealizacaoTarefa
  } = req.body;

  try {
    const newTask = await taskRealizationService.createTaskRealization({
      dataRealizacao,
      criacaoTarefaidTarefaCriada,
      UtilizadoridUtilizador,
      estadoRealizacaoTarefaidEstadoRealizacaoTarefa
    })

    res.status(201).json({ message: "Task successfully created", task: newTask})
  } catch (error) {
    console.error("Error creating task realization: ", error)
    res.status(500).json({ error: "Error creating task realization" })
  }
}

const deleteTaskRealizationController = async (req, res) => {
  const { id } = req.params;

  try {
      const deleted = await taskRealizationService.deleteTaskRealization(id);

      if (deleted === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json({ message: "Task successfully deleted" });
  } catch (error) {
    console.error("Error deleting task: ", error);
    res.status(500).json({ error: "Error deleting task"});
  }
}

module.exports = {
    getTaskRealizationController,
    createTaskRealizationController,
    deleteTaskRealizationController
}