const express = require("express");
const router = express.Router();
const taskRealizationController = require("../controllers/taskRealizationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, taskRealizationController.getTaskRealizationController);

module.exports = router;