const express = require("express");
const router = express.Router();
const { listTasks } = require("../controllers/taskController");

router.get('/', listTasks);

module.exports = router;