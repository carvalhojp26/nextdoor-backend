const {
  Utilizador,
  criacaoTarefa,
  Notificacao,
  realizacaoTarefa,
} = require("../models/association/associations");

const getNotification = async (userId) => {
  try {
    const notifications = await Notificacao.findAll({
      include: [
        {
          model: realizacaoTarefa,
          required: true, // INNER JOIN (garante que tem realizacao)
          include: [
            {
              model: criacaoTarefa,
              required: true,
              where: {
                UtilizadoridUtilizador: userId,
              },
            },
            {
              model: Utilizador,
              attributes: ["idUtilizador", "nomeUtilizador"],
            },
          ],
        },
      ],
    });

    return notifications;
  } catch (error) {
    console.error("Error getting notification in database:", error);
    throw error;
  }
};

const getNotificationById = async (userId, notificationId) => {
  try {
    const notifications = await Notificacao.findOne({
      where: { idNotificacao: notificationId },
      include: [
        {
          model: realizacaoTarefa,
          required: true, // INNER JOIN (garante que tem realizacao)
          include: [
            {
              model: criacaoTarefa,
              required: true,
              where: { UtilizadoridUtilizador: userId },
            },
            {
              model: Utilizador,
              attributes: ["idUtilizador", "nomeUtilizador"],
            },
          ],
        },
      ],
    });

    return notifications;
  } catch (error) {
    console.error("Error getting notification in database:", error);
    throw error;
  }
};

const createNotification = async (body) => {
  try {
    const notification = await Notificacao.create(body);
    return notification;
  } catch (error) {
    console.error("Error adding notification in database:", error);
    throw error;
  }
};

module.exports = { getNotification, createNotification, getNotificationById };
