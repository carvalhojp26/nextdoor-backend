const express = require("express");
const router = express.Router();
const redemptionCodeController = require("../controllers/redemptionCodeController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get('/', sqlInjectionGuard, authenticateToken, redemptionCodeController.getRedemptionCodeController);
router.post('/', sqlInjectionGuard, authenticateToken, redemptionCodeController.createRedemptionCodeController);
module.exports = router;