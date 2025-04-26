const express = require("express");
const router = express.Router();
const redemptionCodeController = require("../controllers/redemptionCodeController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, redemptionCodeController.getRedemptionCodeController);
router.post('/', sqlInjectionGuard, redemptionCodeController.createRedemptionCodeController);
module.exports = router;