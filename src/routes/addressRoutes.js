const express = require("express");
const router = express.Router();
const {
  listAddress,
  addAddress,
  deleteAddressController,
  editAddress,
} = require("../controllers/addressController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get("/", sqlInjectionGuard, listAddress);
router.post("/", sqlInjectionGuard, addAddress);
router.put("/:addressId", sqlInjectionGuard, editAddress);
router.delete("/:addressId", sqlInjectionGuard, deleteAddressController);

module.exports = router;
