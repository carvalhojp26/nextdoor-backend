const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get("/neighborhood/:neighborhoodId", sqlInjectionGuard, userController.getUserByNeighborhoodController);
router.get("/:userId", sqlInjectionGuard, userController.getUserByIdController);
router.get("/", sqlInjectionGuard, userController.getUserController);
router.post("/", sqlInjectionGuard, userController.createUserController);
router.patch("/:userId", sqlInjectionGuard, userController.updateUserController);
router.delete("/:userId", sqlInjectionGuard, userController.deleteUserController);

module.exports = router;
