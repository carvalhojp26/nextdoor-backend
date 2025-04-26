const { feedbackAvaliacao, criacaoTarefa, realizacaoTarefa } = require("../models/association/associations");

const getfeedbackAvaliacao = async () => {
  try {
    const Feedback = await feedbackAvaliacao.findAll({
      include: [
        { model: criacaoTarefa },
        { model: realizacaoTarefa }
      ],
    });
    return Feedback;
  } catch (error) {
    console.error("Error getting Feedback in database:", error);
    throw error;
  }
};

const createfeedbackAvaliacao = async (body) => {
  try {
    const Feedback = await feedbackAvaliacao.create(body);
    return Feedback;
  } catch (error) {
    console.error("Error adding Feedback in database:", error);
    throw error;
  }
};

module.exports = {getfeedbackAvaliacao, createfeedbackAvaliacao}