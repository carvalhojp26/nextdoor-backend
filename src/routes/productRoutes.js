const express = require("express");
const router = express.Router();
const { listProducts } = require("../controllers/productController");

router.get('/', listProducts);

module.exports = router;