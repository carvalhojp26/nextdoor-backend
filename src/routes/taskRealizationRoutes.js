const express = require("express");
const router = express.Router();
const taskRealizationController = require("../controllers/taskRealizationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, taskRealizationController.getTaskRealizationController);
router.post('/', sqlInjectionGuard, taskRealizationController.createTaskRealizationController)

module.exports = router;