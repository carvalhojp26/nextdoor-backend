const express = require("express");
const router = express.Router();
const establishmentController = require("../controllers/establishmentController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

//Admin
router.get("/neighborhood/:neighborhoodId", sqlInjectionGuard, authenticateToken, establishmentController.getEstablishmentsByNeighborhoodController); //Um admin poderá ver os establecimentos por vizinhança
router.post("/", sqlInjectionGuard, authenticateToken, establishmentController.createEstablishmentController);
router.patch("/:establishmentId", sqlInjectionGuard, authenticateToken, establishmentController.updateEstablishmentController);
router.delete("/", sqlInjectionGuard, authenticateToken, establishmentController.deleteEstablishmentController);
//Neighboors
router.get("/", sqlInjectionGuard, authenticateToken, establishmentController.getEstablishmentsController); //Um vizinho poderá ver os establecimentos associados á sua viziznhança
router.get("/:establishmentId", sqlInjectionGuard, authenticateToken, establishmentController.getEstablishmentByIdController);

module.exports = router;
