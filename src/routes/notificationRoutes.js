const express = require("express");
const router = express.Router();
const { listNotifications, addNotification, deleteNotificationController } = require("../controllers/notificationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, listNotifications);
router.post('/', sqlInjectionGuard, addNotification);
router.delete('/:idNotificacao', sqlInjectionGuard, deleteNotificationController);

module.exports = router;