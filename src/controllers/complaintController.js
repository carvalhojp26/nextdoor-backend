const complaintService = require("../services/complaintService");

const listComplaints = async (req, res) => {
  try {
    const result = await complaintService.getComplaint();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addComplaint = async (req, res) => {
  try {
    const result = await complaintService.insertComplaint(req.body);
    res.status(201).json({ message: "Complaint added successfully" });
    res.json(result);
  } catch (error) {
    console.error("Error adding complaint in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteComplaintController = async (req, res) => {
  const { idDenuncia } = req.params;
  try {
    const result = await complaintService.deleteComplaint(idDenuncia);
    res.status(201).json({ message: "Complaint deleted successfully" });
    res.json(result);
  } catch (error) {
    console.error("Error deleting complaint in database: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { listComplaints, addComplaint, deleteComplaintController};
