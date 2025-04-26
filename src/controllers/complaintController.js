const complaintService = require("../services/complaintService");

const getComplaintController = async (req, res) => {
  try {
    const result = await complaintService.getComplaint();
    res.status(200).json({ message: "Complaint fetched successfully", complaints: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createComplaintController = async (req, res) => {
  try {
    const result = await complaintService.createComplaint(req.body);
    res.status(201).json({ message: "Complaint added successfully", complaints: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteComplaintController = async (req, res) => {
  const { idDenuncia } = req.params;
  try {
    const result = await complaintService.deleteComplaint(idDenuncia);
    res.status(200).json({ message: "Complaint deleted successfully", complaints: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getComplaintController, createComplaintController, deleteComplaintController};
