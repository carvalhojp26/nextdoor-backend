const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, complaintController.getComplaintController);
router.post('/', sqlInjectionGuard, complaintController.createComplaintController);
router.delete('/:idDenuncia', sqlInjectionGuard, complaintController.deleteComplaintController);

module.exports = router;