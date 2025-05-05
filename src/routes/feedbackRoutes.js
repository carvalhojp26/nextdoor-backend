const express = require("express");
const router = express.Router();
const feedbackControler= require("../controllers/feedbackController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", sqlInjectionGuard, authenticateToken, feedbackControler.getfeedbackAvaliacaoController);
router.post("/", sqlInjectionGuard, authenticateToken, feedbackControler.createfeedbackAvaliacaoController);

module.exports = router;