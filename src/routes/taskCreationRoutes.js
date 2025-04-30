const express = require("express");
const router = express.Router();
const taskCreationController = require("../controllers/taskCreationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

//Apenas vai mostrar tarefas criadas na sua vizinhança
router.get('/admin', sqlInjectionGuard, authenticateToken, taskCreationController.getAllTaskCreationController); //Administrador poderá ver todas as tarefas criadas
router.get('/', sqlInjectionGuard, authenticateToken, taskCreationController.getTaskCreationController); //Vizinho poderá ver as suas tarefasCriadas
router.get('/neighborhood', sqlInjectionGuard, authenticateToken, taskCreationController.getTaskCreationByNeighborhoodController); //Vizinho poderá ver tarefas criadadas
router.get('/neighborhood/:taskCreationId', sqlInjectionGuard, authenticateToken, taskCreationController.getTaskCreationByIdController); //Vizinho poderá selecionar uma tarefa
router.get('/category/:categoryId', sqlInjectionGuard, authenticateToken, taskCreationController.getTaskCreationByCategoryController); //Vizinho poderá ver tarefas filtradas por uma categoria
router.post('/create', sqlInjectionGuard, authenticateToken, taskCreationController.createTaskCreationController); //Vizinho poderá criar uma tarefa
router.patch("/edit/:taskCreationId", sqlInjectionGuard, authenticateToken, taskCreationController.updateTaskCreationController); //Vizinho poderá editar as suas tarefas
router.delete("/:taskCreationId", sqlInjectionGuard, authenticateToken, taskCreationController.deleteTaskCreationController);

module.exports = router;