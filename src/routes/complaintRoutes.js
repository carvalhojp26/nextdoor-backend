const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get('/', sqlInjectionGuard, authenticateToken, complaintController.getComplaintController);
router.post('/', sqlInjectionGuard, authenticateToken, complaintController.createComplaintController);
router.delete('/:idDenuncia', authenticateToken, sqlInjectionGuard, complaintController.deleteComplaintController);

module.exports = router;