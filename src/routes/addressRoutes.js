const express = require("express");
const router = express.Router();
const { listAddresses, addAddresses, updateAddressController } = require("../controllers/addressController");

router.get("/", listAddresses);
router.post("/", addAddresses);
router.put("/:idEndereco", updateAddressController);

module.exports = router;
