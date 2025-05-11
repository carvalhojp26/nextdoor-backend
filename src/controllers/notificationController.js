const notificationService = require("../services/notificationService");

//Criador da tarefa vê a notificação e aceita ou rejeita
const getNotificationController = async (req, res) => {
  const userId = req.user.idUtilizador;
  try {
    const notifications = await notificationService.getNotification(userId);
    res
      .status(200)
      .json({
        message: "Notification fetched successfully",
        notification: notifications,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getNotificationbyIdController = async (req, res) => {
  const { notificationId } = req.params;
  const userId = req.user.idUtilizador;

  try {
    const notifications = await notificationService.getNotificationById(
      userId,
      notificationId
    );
    res
      .status(200)
      .json({
        message: "Notification by id fetched successfully",
        notification: notifications,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Ao realizar a tarefa cria a notificação
const createNotificationController = async (req, res) => {
  const { mensagem, realizacaoTarefaidRealizacaoTarefa } = req.body;
  const dataEnvio = new Date();

  if (!mensagem || !realizacaoTarefaidRealizacaoTarefa) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const newNotification = await notificationService.createNotification({
      mensagem,
      dataEnvio,
      realizacaoTarefaidRealizacaoTarefa,
    });
    res
      .status(201)
      .json({
        message: "Notification added successfully",
        notification: newNotification,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getNotificationController,
  getNotificationbyIdController,
  createNotificationController,
};
