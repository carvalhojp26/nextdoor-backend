const {
  feedbackAvaliacao,
  criacaoTarefa,
  realizacaoTarefa,
  Utilizador,
} = require("../models/association/associations");

const getfeedback = async (userId) => {
  try {
    const Feedback = await feedbackAvaliacao.findAll({
      include: [
        { model: criacaoTarefa, include: [{ model: Utilizador }] },
        { model: realizacaoTarefa, where: { UtilizadoridUtilizador: userId } },
      ],
    });
    return Feedback;
  } catch (error) {
    console.error("Error getting Feedback in database:", error);
    throw error;
  }
};

const createfeedback = async (body) => {
  try {
    const Feedback = await feedbackAvaliacao.create(body);
    return Feedback;
  } catch (error) {
    console.error("Error adding Feedback in database:", error);
    throw error;
  }
};

module.exports = { getfeedback, createfeedback };
