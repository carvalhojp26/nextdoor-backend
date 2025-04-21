const notificationService = require("../services/notificationService");

const listNotifications = async (req, res) => {
  try {
    const result = await notificationService.getNotification();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addNotification = async (req, res) => {
  try {
    const result = await notificationService.insertNotification(req.body);
    res.status(201).json({ message: "Notification added successfully" });
    res.json(result);
  } catch (error) {
    console.error("Error adding notification in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNotificationController = async (req, res) => {
  const { idNotificacao } = req.params;
  try {
    const result = await notificationService.deleteNotification(idNotificacao);
    res.status(201).json({ message: "Notification deleted successfully" });
    res.json(result);
  } catch (error) {
    console.error("Error deleting notification in database: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { listNotifications, addNotification, deleteNotificationController};
