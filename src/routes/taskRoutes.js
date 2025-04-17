const express = require("express");
const router = express.Router();
const { listTasks, addTaskController } = require("../controllers/taskController");

router.get('/', listTasks);
router.post('/', addTaskController);

module.exports = router;