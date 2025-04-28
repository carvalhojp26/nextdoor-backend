const express = require("express");
const router = express.Router();
const taskCreationController = require("../controllers/taskCreationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get('/user/:userId', sqlInjectionGuard, authenticateToken, taskCreationController.getTaskCreationByUserController);
router.get('/category/:categoryId', sqlInjectionGuard, authenticateToken, taskCreationController.getTaskCreationByCategoryController);
router.get('/:id', sqlInjectionGuard, authenticateToken, taskCreationController.getTaskCreationByIdController);
router.get('/', sqlInjectionGuard, authenticateToken, taskCreationController.getTaskCreationController);
router.post('/', sqlInjectionGuard, authenticateToken, taskCreationController.createTaskCreationController);
router.patch("/:id", sqlInjectionGuard, authenticateToken, taskCreationController.updateTaskCreationController);
router.delete("/:id", sqlInjectionGuard, authenticateToken, taskCreationController.deleteTaskCreationController);

module.exports = router;