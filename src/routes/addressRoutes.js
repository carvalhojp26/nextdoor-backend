const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", sqlInjectionGuard, authenticateToken, addressController.getAddressController);
router.post("/", sqlInjectionGuard, authenticateToken, addressController.createAddressController);
router.patch("/:addressId", sqlInjectionGuard, authenticateToken, addressController.updateAddressController);
router.delete("/:addressId", sqlInjectionGuard, authenticateToken, addressController.deleteAddressController);

module.exports = router;
