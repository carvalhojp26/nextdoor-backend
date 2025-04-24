const express = require("express");
const router = express.Router();
const taskCreationController = require("../controllers/taskCreationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/user/:userId', sqlInjectionGuard, taskCreationController.getTaskCreationByUserController);
router.get('/category/:categoryId', sqlInjectionGuard, taskCreationController.getTaskCreationByCategoryController);
router.get('/:id', sqlInjectionGuard, taskCreationController.getTaskCreationByIdController);
router.get('/', sqlInjectionGuard, taskCreationController.getTaskCreationController);
router.post('/', sqlInjectionGuard, taskCreationController.createTaskCreationController);
router.patch("/:id", sqlInjectionGuard, taskCreationController.updateTaskCreationController);
router.delete("/:id", sqlInjectionGuard, taskCreationController.deleteTaskCreationController);

module.exports = router;