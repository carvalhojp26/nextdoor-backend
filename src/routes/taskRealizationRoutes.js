const express = require("express");
const router = express.Router();
const taskRealizationController = require("../controllers/taskRealizationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get('/', sqlInjectionGuard, authenticateToken, taskRealizationController.getTasksRealizationController); //Um vizinho poderá ver as suas tarefas realizadas.
router.get('/:userId', sqlInjectionGuard, authenticateToken, taskRealizationController.getTasksRealizationByUserController); //Um vizinho poderá ver as tarefas realizadas por outro vizinho
router.post('/', sqlInjectionGuard, authenticateToken, taskRealizationController.createTaskRealizationController); //Um vizinho poderá executar e concluir uma tarefa
router.patch('/:taskRealizationId', sqlInjectionGuard, authenticateToken, taskRealizationController.updateTaskRealizationController); //Apenas para o sistema mudar o estado da tarefa
router.delete('/:id', sqlInjectionGuard, authenticateToken, taskRealizationController.deleteTaskRealizationController); //Um vizinho poderá eliminar uma das suas tarefas realizadas

module.exports = router;