const taskService = require("../services/taskService");

const listTasks = async (req, res) => {
    try {
        const result = await taskService.getTasks();
        res.json(result);
    } catch (error) {
        console.error("Error getting tasks in database: ", error);
        res.status(500).json("Internal server error.");
    }
}

module.exports = { listTasks };