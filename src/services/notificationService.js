const {
    Utilizador,
    criacaoTarefa,
    Notificacao
  } = require("../models/association/associations");
  
  const getNotification = async (userId) => {
    try {
      const notifications = await Notificacao.findAll({
        where: { UtilizadoridUtilizador: userId },
        include: [
          { model: Utilizador },
          { model: criacaoTarefa },
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
  
  const deleteNotification = async (notificationId) => {
    try {
      const deleted = await Notificacao.destroy({ where: { idNotificacao: notificationId } });
      return deleted;
    } catch (error) {
      console.error("Error deleting notification in database:", error);
      throw error;
    }
  };
  
  module.exports = { getNotification, createNotification, deleteNotification };
  