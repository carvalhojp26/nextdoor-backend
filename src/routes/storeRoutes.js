const express = require("express");
const router = express.Router();
const { listStores } = require("../controllers/storeController");

router.get('/', listStores);

module.exports = router;