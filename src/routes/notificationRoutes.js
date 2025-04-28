const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get('/', sqlInjectionGuard, authenticateToken, notificationController.getNotificationController);
router.post('/', sqlInjectionGuard, authenticateToken, notificationController.createNotificationController);
router.delete('/:notificationId', authenticateToken, sqlInjectionGuard, notificationController.deleteNotificationController);

module.exports = router;