// src/routes/productStatusRoutes.js
const express = require("express");
const router = express.Router();
const productStatusController = require("../controllers/productStatusController");
const authenticateToken = require("../middlewares/authenticateToken"); // Se aplicável

router.get('/', authenticateToken, productStatusController.getAllProductStatusController);

module.exports = router;