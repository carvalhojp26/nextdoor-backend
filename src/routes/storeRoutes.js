const express = require("express");
const router = express.Router();
const { listStores } = require("../controllers/storeController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, listStores);

module.exports = router;