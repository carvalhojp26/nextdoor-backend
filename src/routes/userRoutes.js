const express = require("express");
const router = express.Router();
const {
  listUsers,
  deleteUserController,
  editUser,
  registerUserController,
  loginUserController
} = require("../controllers/userController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", sqlInjectionGuard, listUsers);
router.post("/register", sqlInjectionGuard, registerUserController)
router.post("/login", sqlInjectionGuard, loginUserController)
router.put("/:userId", sqlInjectionGuard, editUser);
router.delete("/:userId", sqlInjectionGuard, deleteUserController);

router.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "You are authenticated!" });
})

module.exports = router;
