const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, notificationController.getNotificationController);
router.post('/', sqlInjectionGuard, notificationController.createNotificationController);
router.delete('/:notificationId', sqlInjectionGuard, notificationController.deleteNotificationController);

module.exports = router;