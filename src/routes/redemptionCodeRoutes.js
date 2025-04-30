const express = require("express");
const router = express.Router();
const redemptionCodeController = require("../controllers/redemptionCodeController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

//Apenas vai mostrar códigos associados ao próprio utilizador
router.get('/', sqlInjectionGuard, authenticateToken, redemptionCodeController.getRedemptionCodesController);
router.post('/', sqlInjectionGuard, authenticateToken, redemptionCodeController.createRedemptionCodeController);
module.exports = router;