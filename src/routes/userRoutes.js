const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");


router.get("/", sqlInjectionGuard, authenticateToken, userController.getUserController);
router.get("/neighborhood/:neighborhoodId", authenticateToken, sqlInjectionGuard, userController.getUserByNeighborhoodController);
router.post("/register", sqlInjectionGuard, userController.registerUserController)
router.post("/login", sqlInjectionGuard, userController.loginUserController)
router.patch("/:userId", sqlInjectionGuard, authenticateToken, userController.updateUserController);
router.get("/:userId", sqlInjectionGuard, authenticateToken, userController.getUserByIdController);
router.delete("/:userId", authenticateToken, sqlInjectionGuard, userController.deleteUserController);

module.exports = router;
