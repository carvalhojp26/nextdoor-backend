const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get('/', sqlInjectionGuard, authenticateToken, categoryController.getCategoryController);
router.get('/:categoryId', sqlInjectionGuard, authenticateToken, categoryController.getCategoryByIdController);

module.exports = router;