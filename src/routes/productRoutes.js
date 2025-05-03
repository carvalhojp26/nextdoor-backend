const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const upload = require("../middlewares/imageUploads")
const authenticateToken = require("../middlewares/authenticateToken");
//Admin
router.get('/establishment/:establishmentId', sqlInjectionGuard, authenticateToken, productController.getProductByEstablishmentController);
router.delete("/:productId", sqlInjectionGuard, authenticateToken, productController.deleteProductController);
router.post('/', sqlInjectionGuard, authenticateToken, upload.single('imagemProduto'), productController.createProductController);
router.patch('/:productId', sqlInjectionGuard, authenticateToken, productController.updateProductController);
//Neighboors
router.get('/type/:typeId', sqlInjectionGuard, authenticateToken, productController.getProductByTypeController);
router.get('/:productId', sqlInjectionGuard, authenticateToken, productController.getProductByIdController);
router.get('/', sqlInjectionGuard, authenticateToken, productController.getProductController);

module.exports = router;