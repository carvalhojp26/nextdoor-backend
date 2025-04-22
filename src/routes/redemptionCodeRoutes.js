const express = require("express");
const router = express.Router();
const { listRedemptionCodes, addRedemptionCodes } = require("../controllers/redemptionCodeController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, listRedemptionCodes);
router.post('/', sqlInjectionGuard, addRedemptionCodes);
module.exports = router;