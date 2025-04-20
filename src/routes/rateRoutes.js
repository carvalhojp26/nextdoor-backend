const express = require("express");
const router = express.Router();
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const { listRates, addRate } = require("../controllers/rateController");

router.get("/", sqlInjectionGuard, listRates);
router.post("/", sqlInjectionGuard, addRate);

module.exports = router;
