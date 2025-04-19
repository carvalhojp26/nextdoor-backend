const express = require("express");
const router = express.Router();
const { listUsers, addUser, deleteUserController } = require("../controllers/userController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, listUsers);
router.post('/', sqlInjectionGuard, addUser);
router.delete('/:idUtilizador', sqlInjectionGuard, deleteUserController);

module.exports = router;