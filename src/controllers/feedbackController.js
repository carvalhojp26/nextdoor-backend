const feedbackService = require("../services/feedbackService");

const getfeedbackAvaliacaoController = async (req, res) => {
  const userId = req.user.idUtilizador;
  try {
    const result = await feedbackService.getfeedback(userId);
    res.status(200).json({
      message: "Feedback was successfully fetched",
      feedbackAvaliacao: result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createfeedbackAvaliacaoController = async (req, res) => {
  const {
    comentario,
    pontuacao,
    criacaoTarefaidTarefaCriada,
    RealizacaoTarefaidRealizacaoTarefa,
  } = req.body;
  if (
    (!pontuacao || !criacaoTarefaidTarefaCriada, !RealizacaoTarefaidRealizacaoTarefa)
  ) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  if (pontuacao < 0) {
    return res.status(400).json({ error: "Score needs to be above 0." });
  }
  if (pontuacao > 5) {
    return res.status(400).json({ error: "Score needs to be below 5." });
  }
  try {
    const result = await feedbackService.createfeedback({
      pontuacao,
      comentario,
      criacaoTarefaidTarefaCriada,
      RealizacaoTarefaidRealizacaoTarefa,
    });
    res.status(201).json({
      message: "Feedback added successfully",
      feedbackAvaliacao: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getfeedbackAvaliacaoController,
  createfeedbackAvaliacaoController,
};
