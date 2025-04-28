const express = require("express");
const router = express.Router();
const taskRealizationController = require("../controllers/taskRealizationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get('/', sqlInjectionGuard, authenticateToken, taskRealizationController.getTaskRealizationController);
router.post('/', sqlInjectionGuard, authenticateToken, taskRealizationController.createTaskRealizationController);
router.delete('/:id', sqlInjectionGuard, authenticateToken, taskRealizationController.deleteTaskRealizationController);

module.exports = router;