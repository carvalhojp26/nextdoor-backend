  const taskRealizationService = require("../services/taskRealizationService");
  const userService = require("../services/userService");
  const taskCreationService = require("../services/taskCreationService");

  const getTasksInRealizationController = async (req, res) => {
    const userId = req.user.idUtilizador;
    try {
      const result = await taskRealizationService.getTasksInRealization(
        userId
      );
      res
        .status(200)
        .json({
          message: "Tasks in execution fetched sucessfully",
          task: result,
        });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch performed tasks" });
    }
  };

    const getTasksRealizatedController = async (req, res) => {
    const userId = req.user.idUtilizador;
    try {
      const result = await taskRealizationService.getTasksRealizeted(
        userId
      );
      res
        .status(200)
        .json({
          message: "Tasks conclued fetched sucessfully",
          task: result,
        });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch performed tasks" });
    }
  };

  const getTasksRealizationByUserController = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await userService.getUser(userId);
      const neighborhoodId = user.VizinhançaidVizinhança;
      const result = await taskRealizationService.getTasksRealizationByUser(
        userId,
        neighborhoodId
      );
      res.status(200).json({ message: "Task fetched successfully", task: result });
    } catch (error) {
      res.status(500).json({ error: "Task not found" });
    }
  };


  const createTaskRealizationController = async (req, res) => {
    const userId = req.user.idUtilizador;
    const dataRealizacao = Date();
    const {
      criacaoTarefaidTarefaCriada,
    } = req.body;
    
    try {
      //Verificação para que o utilizador logado não possa realizar as suas tarefas e apenas possa realizar uma tarefa de cada vez
      const user = await userService.getUser(userId);
      const neighborhoodId = user.VizinhançaidVizinhança;
      const taskCreation = await taskCreationService.getTaskCreationById(criacaoTarefaidTarefaCriada, neighborhoodId);
      const taskCreatorId = taskCreation.UtilizadoridUtilizador;

      if(req.user.idUtilizador == taskCreatorId)
      {
        return res.status(403).json({error: "You cant realize your own tasks.",
        });
      }
      const newTaskAcepted = await taskRealizationService.createTaskRealization({
        dataRealizacao,
        criacaoTarefaidTarefaCriada,
        UtilizadoridUtilizador: userId,
        estadoRealizacaoTarefaidEstadoRealizacaoTarefa: 3, //Colocar estado em execução
      });
      res
      .status(201)
      .json({
        message: "Task performed successfully created",
        task: newTaskAcepted,
      });
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Error creating task realization" });
    }
  };

  //Apenas vai servir para alterar o estado da realização da tarefa
  const updateTaskRealizationController = async (req, res) => {
    const { taskRealizationId } = req.params;
    const userId = req.user.idUtilizador;
    const updatedFields = req.body;
    try {
      const updated = await taskRealizationService.updateTaskRealization(
        taskRealizationId,
        updatedFields,
        userId
      );

      res.status(200).json({ message: "Task updated successfully", updatedFields: updated });
    } catch (error) {
      res.status(500).json({ error: "Task not found" });
    }
  };

  const deleteTaskRealizationController = async (req, res) => {
    const { taskRealizationId } = req.params;
    const userId = req.user.idUtilizador;
    
    try {
      const deleted = await taskRealizationService.deleteTaskRealization(
        taskRealizationId,
        userId
      );
      
      if (deleted === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
      
      res.status(200).json({ message: "Task performed successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting task" });
    }
  };

  module.exports = {
    getTasksInRealizationController,
    getTasksRealizatedController,
    getTasksRealizationByUserController,
    createTaskRealizationController,
    updateTaskRealizationController,
    deleteTaskRealizationController,
  };
