const express = require("express");
const router = express.Router();
const { listUsers, addUser, deleteUserController } = require("../controllers/userController");

router.get('/', listUsers);
router.post('/', addUser);
router.delete('/:idUtilizador', deleteUserController);

module.exports = router;