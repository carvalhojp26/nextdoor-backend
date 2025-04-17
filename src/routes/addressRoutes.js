const express = require("express");
const router = express.Router();
const {
  listAddresses,
  addAddresses,
  changeAddresses,
} = require("../controllers/addressController");

router.get("/", listAddresses);
router.post("/", addAddresses);
router.put("/:idEndereco", changeAddresses);

module.exports = router;
