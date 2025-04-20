const express = require("express");
const router = express.Router();
const {
  listAddresses,
  addAddresses,
  updateAddressController,
} = require("../controllers/addressController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get("/", sqlInjectionGuard, listAddresses);
router.post("/", sqlInjectionGuard, addAddresses);
router.put("/:idEndereco", sqlInjectionGuard, updateAddressController);

module.exports = router;
