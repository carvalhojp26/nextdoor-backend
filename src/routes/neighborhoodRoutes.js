const express = require("express");
const router = express.Router();
const { listNeighborhoods, addNeighborhoods } = require("../controllers/neighborhoodController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get("/", sqlInjectionGuard, listNeighborhoods);
router.post("/", sqlInjectionGuard, addNeighborhoods);

module.exports = router;
