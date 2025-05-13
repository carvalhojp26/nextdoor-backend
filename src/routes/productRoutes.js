const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");
// //Admin
// router.get('/establishments/:establishmentId', sqlInjectionGuard, authenticateToken, productController.getProductByAllEstablishmentController); //Consegue aceder a todos os produtos de todos os estabelecimentos
// router.delete("/:productId", sqlInjectionGuard, authenticateToken, productController.deleteProductController);
// router.post('/', sqlInjectionGuard, authenticateToken, productController.createProductController);
// router.patch('/:productId', sqlInjectionGuard, authenticateToken, productController.updateProductController);
// router.get('/all', sqlInjectionGuard, authenticateToken, productController.getAllProductsAdminController);

// //Neighboors
// router.get('/establishment/:establishmentId', sqlInjectionGuard, authenticateToken, productController.getProductByEstablsihmentController); //Apenas acede aos produtos do estabelecimento escolhido da sua vizinhança
// router.get('/type/:typeId', sqlInjectionGuard, authenticateToken, productController.getProductByTypeController);
// router.get('/:productId', sqlInjectionGuard, authenticateToken, productController.getProductByIdController);
// router.get('/', sqlInjectionGuard, authenticateToken, productController.getProductController); //Pode ver todos os produtos associados á sua vizinhança
// router.get('/neighborhood', authenticateToken, sqlInjectionGuard, productController.getProductsByMyNeighborhoodController); // Nome do controlador atualizado

// --- Rotas para Administrador ---
// Estas são bastante específicas ou usam /all
router.get('/all', sqlInjectionGuard, authenticateToken, productController.getAllProductsAdminController);
router.get('/establishments/:establishmentId', sqlInjectionGuard, authenticateToken, productController.getProductByAllEstablishmentController); // Admin vê todos os produtos de um estabelecimento
router.post('/', sqlInjectionGuard, authenticateToken, productController.createProductController); // Criar produto
// Rotas com :productId para admin devem vir depois das específicas de utilizador se houver conflito de paths
// ou garantir que a lógica de permissão dentro do controlador é robusta.

// --- Rotas para Utilizador Logado (Vizinhos) ---
// Rotas mais específicas primeiro
router.get('/neighborhood', authenticateToken, sqlInjectionGuard, productController.getProductsByMyNeighborhoodController); // <<-- MOVIDA PARA CIMA
router.get('/type/:typeId', authenticateToken, sqlInjectionGuard, productController.getProductByTypeController);

// Rota para utilizador ver produtos de um estabelecimento específico NA SUA VIZINHANÇA
// Nota: Esta rota é idêntica em path à de admin `router.get('/establishments/:establishmentId', ...)`.
// O Express usará a PRIMEIRA que corresponder. Precisas de diferenciar estas rotas ou ter lógica no controlador.
// Se a intenção é diferente, o path deveria ser diferente, ex: '/my-neighborhood-establishment/:establishmentId'
// Ou, se o mesmo controlador productController.getProductByEstablsihmentController é usado para ambos,
// ele precisa de verificar o tipo de utilizador e aplicar filtros diferentes.
// Vou assumir que esta é para utilizadores e a de cima para admin.
router.get('/establishment/:establishmentId', sqlInjectionGuard, authenticateToken, productController.getProductByEstablsihmentController); 

// Rota raiz para produtos (para utilizadores, deve filtrar pela sua vizinhança)
router.get('/', sqlInjectionGuard, authenticateToken, productController.getProductsByMyNeighborhoodController); // <<< ALTERADO: Apontar para o controlador correto
// A tua descrição diz: "Pode ver todos os produtos associados á sua vizinhança"
// Então, a rota raiz '/' para produtos de utilizador deve chamar o mesmo controlador que '/neighborhood'.
// O teu `productController.getProductController` antigo precisaria ser adaptado ou removido se for redundante.

// Rotas com :productId (mais genéricas) por último
router.get('/:productId', sqlInjectionGuard, authenticateToken, productController.getProductByIdController);
router.patch('/:productId', sqlInjectionGuard, authenticateToken, productController.updateProductController); // Atualizar produto (geralmente admin)
router.delete("/:productId", sqlInjectionGuard, authenticateToken, productController.deleteProductController); // Deletar produto (geralmente admin)

module.exports = router;