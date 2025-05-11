const express = require("express");
const router = express.Router();
const productTypeController = require("../controllers/productTypesController");
const authenticateToken = require("../middlewares/authenticateToken");

router.get('/', authenticateToken, productTypeController.getAllProductTypesController);

module.exports = router;