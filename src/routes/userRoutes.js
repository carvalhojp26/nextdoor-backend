const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");


router.get("/neighborhood/:neighborhoodId", sqlInjectionGuard, userController.getUserByNeighborhoodController);
router.get("/:userId", sqlInjectionGuard, userController.getUserByIdController);
router.get("/", sqlInjectionGuard, userController.getUserController);
router.post("/register", sqlInjectionGuard, userController.registerUserController)
router.post("/login", sqlInjectionGuard, userController.loginUserController)
router.put("/:userId", sqlInjectionGuard, userController.updateUserController);
router.delete("/:userId", sqlInjectionGuard, userController.deleteUserController);

router.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "You are authenticated!" });
})

module.exports = router;
