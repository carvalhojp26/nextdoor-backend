const express = require("express");
const router = express.Router();
const neighborhoodController= require("../controllers/neighborhoodController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get("/", sqlInjectionGuard, neighborhoodController.getNeighborhoodController);
router.post("/", sqlInjectionGuard, neighborhoodController.createNeighborhoodController);

module.exports = router;
