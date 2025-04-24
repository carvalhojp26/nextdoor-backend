const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get("/", sqlInjectionGuard, addressController.getAddressController);
router.post("/", sqlInjectionGuard, addressController.createAddressController);
router.patch("/:addressId", sqlInjectionGuard, addressController.updateAddressController);
router.delete("/:addressId", sqlInjectionGuard, addressController.deleteAddressController);

module.exports = router;
