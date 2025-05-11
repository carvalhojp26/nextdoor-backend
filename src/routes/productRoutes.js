const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");
//Admin
router.get('/establishments/:establishmentId', sqlInjectionGuard, authenticateToken, productController.getProductByAllEstablishmentController); //Consegue aceder a todos os produtos de todos os estabelecimentos
router.delete("/:productId", sqlInjectionGuard, authenticateToken, productController.deleteProductController);
router.post('/', sqlInjectionGuard, authenticateToken, productController.createProductController);
router.patch('/:productId', sqlInjectionGuard, authenticateToken, productController.updateProductController);
router.get('/all', sqlInjectionGuard, authenticateToken, productController.getAllProductsAdminController);
//Neighboors
router.get('/establishment/:establishmentId', sqlInjectionGuard, authenticateToken, productController.getProductByEstablsihmentController); //Apenas acede aos produtos do estabelecimento escolhido da sua vizinhança
router.get('/type/:typeId', sqlInjectionGuard, authenticateToken, productController.getProductByTypeController);
router.get('/:productId', sqlInjectionGuard, authenticateToken, productController.getProductByIdController);
router.get('/', sqlInjectionGuard, authenticateToken, productController.getProductController); //Pode ver todos os produtos associados á sua vizinhança


module.exports = router;