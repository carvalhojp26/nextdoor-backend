const taskRealizationService = require("../services/taskRealizationService");

const getTaskRealizationController = async (req, res) => {
  try {
    const realizations = await taskRealizationService.getTaskRealization();
    res.status(200).json(realizations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task realizations" });
  }
};

module.exports = {
    getTaskRealizationController
}