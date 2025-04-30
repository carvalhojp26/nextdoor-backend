const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

//Administradores
router.get("/", authenticateToken, sqlInjectionGuard, userController.getAllUsersController);
router.delete("/delete/:userId", authenticateToken, sqlInjectionGuard, userController.deleteUserController); //Apenas para administradores
//Vizinhos
router.get("/perfil", authenticateToken, sqlInjectionGuard, userController.getUserController); //Vizinho poderá ver o seu próprio perfil
router.patch("/edit", sqlInjectionGuard, authenticateToken, userController.updateUserController); //O Vizinho  poderá editar o seu perfil
router.get("/neighborhood", authenticateToken, sqlInjectionGuard, userController.getUsersByNeighborhoodController); //O vizinho poderá ver apenas os seus vizinhos
router.get("/neighborhood/:userId", sqlInjectionGuard, authenticateToken, userController.getUserByIdController); //o vizinho poderá selecionar um vizinho seu
router.post("/register", sqlInjectionGuard, userController.registerUserController);
router.post("/login", sqlInjectionGuard, userController.loginUserController);

module.exports = router;
