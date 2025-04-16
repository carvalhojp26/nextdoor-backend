const express = require("express");
const router = express.Router();
const {
  getAdresses,
  addAdresses,
  updateAdresses,
} = require("../controllers/adressController");

router.get("/", getAdresses);
router.post("/", addAdresses);
router.put("/:idEndereco", updateAdresses);

module.exports = router;
