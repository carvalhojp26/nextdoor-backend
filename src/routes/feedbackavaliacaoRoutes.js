const express = require("express");
const router = express.Router();
const feedbackControler= require("../controllers/feedbackControler");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get("/", sqlInjectionGuard, feedbackControler.getfeedbackAvaliacaoController);
router.post("/", sqlInjectionGuard, feedbackControler.createfeedbackAvaliacaoController);

module.exports = router;
