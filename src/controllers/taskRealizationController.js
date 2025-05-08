  const taskRealizationService = require("../services/taskRealizationService");
  const userService = require("../services/userService");
  const taskCreationService = require("../services/taskCreationService");

  const getTasksRealizationController = async (req, res) => {
    const userId = req.user.idUtilizador;
    try {
      const result = await taskRealizationService.getTasksRealization(
        userId
      );
      res
        .status(200)
        .json({
          message: "Tasks performed fetched sucessfully",
          task: result,
        });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch performed tasks" });
    }
  };

  const getTasksRealizationByUserController = async (req, res) => {
    const { userId } = req.params;
    const id = req.user.idUtilizador;
    try {
      const allUsers = await userService.getAllUsers();
      const findUser = allUsers.find((u) => u.idUtilizador === id);
      const neighborhoodId = findUser.VizinhançaidVizinhança;
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
      estadoRealizacaoTarefaidEstadoRealizacaoTarefa,
    } = req.body;
    
    try {
      //Verificação para que o utilizador logado não possa realizar as suas tarefas.
      const user = await userService.getUser(userId);
      const neighborhoodId = user.VizinhançaidVizinhança;
      const taskCreation = await taskCreationService.getTaskCreationById(criacaoTarefaidTarefaCriada, neighborhoodId);
      const taskCreatorId = await taskCreation.UtilizadoridUtilizador;

      if(req.user.idUtilizador == taskCreatorId)
      {
        return res.status(403).json({error: "You cant realize your own tasks.",
        });
      }
      const newTaskAcepted = await taskRealizationService.createTaskRealization({
        dataRealizacao,
        criacaoTarefaidTarefaCriada,
        UtilizadoridUtilizador: userId,
        estadoRealizacaoTarefaidEstadoRealizacaoTarefa,
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
    getTasksRealizationController,
    getTasksRealizationByUserController,
    createTaskRealizationController,
    updateTaskRealizationController,
    deleteTaskRealizationController,
  };
