const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/establishment/:establishmentId', sqlInjectionGuard, productController.getProductByEstablishmentController);
router.get('/type/:typeId', sqlInjectionGuard, productController.getProductByTypeController);
router.get('/:productId', sqlInjectionGuard, productController.getProductByIdController);
router.get('/', sqlInjectionGuard, productController.getProductController);
router.post('/', sqlInjectionGuard, productController.createProductController);
router.patch('/:productId', sqlInjectionGuard, productController.updateProductController);
router.delete("/:productId", sqlInjectionGuard, productController.deleteProductController);
module.exports = router;