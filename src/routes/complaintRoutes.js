const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get('/', sqlInjectionGuard, authenticateToken, complaintController.getAllComplaintsController);
router.get('/:complaintId', sqlInjectionGuard, authenticateToken, complaintController.getComplaintByIdController);
router.post('/', sqlInjectionGuard, authenticateToken, complaintController.createComplaintController);

module.exports = router;