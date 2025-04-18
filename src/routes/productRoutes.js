const express = require("express");
const router = express.Router();
const { listProducts } = require("../controllers/productController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, listProducts);

module.exports = router;