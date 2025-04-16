const express = require("express");
const router = express.Router();
const { listAddresses, addAddresses, updateAddresses } = require("../controllers/addressController");

router.get("/", listAddresses);
router.post("/", addAddresses);
router.put("/:idEndereco", updateAddresses);

module.exports = router;
