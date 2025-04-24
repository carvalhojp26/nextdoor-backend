const express = require("express");
const router = express.Router();
const {
  listUsers,
  addUser,
  deleteUserController,
  editUser,
  registerUserController,
  loginUserController
} = require("../controllers/userController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get("/", sqlInjectionGuard, listUsers);
//router.post("/", sqlInjectionGuard, addUser);
router.post("/register", sqlInjectionGuard, registerUserController)
router.post("/login", sqlInjectionGuard, loginUserController)
router.put("/:userId", sqlInjectionGuard, editUser);
router.delete("/:userId", sqlInjectionGuard, deleteUserController);

module.exports = router;
