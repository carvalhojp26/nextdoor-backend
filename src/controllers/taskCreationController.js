const taskCreationService = require("../services/taskCreationService");

const getTaskCreationController = async (req, res) => {
  try {
    const tasks = await taskCreationService.getTaskCreation();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error getting taskCreation" });
  }
};

module.exports = {
  getTaskCreationController,
};
