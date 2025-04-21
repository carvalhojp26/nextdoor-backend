const express = require("express");
const router = express.Router();
const { listComplaints, addComplaint, deleteComplaintController } = require("../controllers/complaintController");
const sqlInjectionGuard = require("../middlewares/sqlInjectionGuard");

router.get('/', sqlInjectionGuard, listComplaints);
router.post('/', sqlInjectionGuard, addComplaint);
router.delete('/:idDenuncia', sqlInjectionGuard, deleteComplaintController);

module.exports = router;