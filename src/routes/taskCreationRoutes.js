const express = require("express");
const router = express.Router();
const taskCreationController = require("../controllers/taskCreationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, taskCreationController.getTaskCreationController);
router.post('/', sqlInjectionGuard, taskCreationController.createTaskCreationController);
router.delete("/:id", sqlInjectionGuard, taskCreationController.deleteTaskCreationController);

module.exports = router;