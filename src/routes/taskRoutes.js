const express = require("express");
const router = express.Router();
const { listTasks, addTaskController } = require("../controllers/taskController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, listTasks);
router.post('/', sqlInjectionGuard, addTaskController);

module.exports = router;