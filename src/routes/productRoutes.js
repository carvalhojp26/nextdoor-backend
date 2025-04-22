const express = require("express");
const router = express.Router();
const { listProducts, addProduct, editProduct } = require("../controllers/productController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, listProducts);
router.post('/', sqlInjectionGuard, addProduct);
router.put('/:productId', sqlInjectionGuard, editProduct);
module.exports = router;