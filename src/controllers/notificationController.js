const notificationService = require("../services/notificationService");

const listNotifications = async (req, res) => {
  try {
    const result = await notificationService.getNotification();
    res.status(200).json({ message: "Notification fetched successfully", notification: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addNotification = async (req, res) => {
  try {
    const result = await notificationService.insertNotification(req.body);
    res.status(201).json({ message: "Notification added successfully", notification: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNotificationController = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const result = await notificationService.deleteNotification(notificationId);
    res.status(201).json({ message: "Notification deleted successfully", notification: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { listNotifications, addNotification, deleteNotificationController};
