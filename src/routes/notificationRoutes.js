const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

//Usado apenas para aparecer um pop-up no criador da tarefa no momento em que o realizador conclui a tarefa, o criador poderá decidir se aceita ou não
router.get('/', sqlInjectionGuard, authenticateToken, notificationController.getNotificationController);
router.get('/:notificationId', sqlInjectionGuard, authenticateToken, notificationController.getNotificationbyIdController);
router.post('/', sqlInjectionGuard, authenticateToken, notificationController.createNotificationController);

module.exports = router;