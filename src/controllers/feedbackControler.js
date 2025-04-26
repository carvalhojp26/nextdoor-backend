const feedbackAvaliacaoService = require("../services/feedbackAvaliacaoService")

const getfeedbackAvaliacaoController = async (req, res) => {
  try {
    const result = await feedbackAvaliacaoService.getfeedbackAvaliacao();
    res.status(200).json({ message: "Feedback was successfully fetched", feedbackAvaliacao: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createfeedbackAvaliacaoController = async (req, res) => {
  try {
    const result = await feedbackAvaliacaoService.createfeedbackAvaliacao(req.body);
    res.status(201).json({ message: "Feedback added successfully", feedbackAvaliacao: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {getfeedbackAvaliacaoController, createfeedbackAvaliacaoController}