const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

//admin para estabelecimentos
router.delete("/:addressId", sqlInjectionGuard, authenticateToken, addressController.deleteAddressController);
router.patch("/:addressId", sqlInjectionGuard, authenticateToken, addressController.updateAddressController); 
//Vizinho
router.post("/", sqlInjectionGuard, addressController.createAddressController);

module.exports = router;
