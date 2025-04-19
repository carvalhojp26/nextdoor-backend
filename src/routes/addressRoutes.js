const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const {
  listAddresses,
  addAddresses,
  changeAddresses,
} = require("../controllers/addressController");

router.get("/", listAddresses);
router.post("/", addAddresses);
router.put("/:idEndereco", changeAddresses);
=======
const { listAddresses, addAddresses, updateAddressController } = require("../controllers/addressController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get("/", sqlInjectionGuard, listAddresses);
router.post("/", sqlInjectionGuard, addAddresses);
router.put("/:idEndereco", sqlInjectionGuard, updateAddressController);
>>>>>>> 5ea9dc4f99fe89a835af0f68bd18b50be48f0a07

module.exports = router;
