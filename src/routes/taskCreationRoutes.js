const express = require("express");
const router = express.Router();
const taskCreationController = require("../controllers/taskCreationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, taskCreationController.getTaskCreationController);

module.exports = router;