const complaintService = require("../services/complaintService");

//admin
const getAllComplaintsController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const result = await complaintService.getAllComplaints();
    res
      .status(200)
      .json({ message: "Complaint fetched successfully", complaints: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getComplaintByIdController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  const { complaintId } = req.params;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const result = await complaintService.getComplaintById(complaintId);
    res
      .status(200)
      .json({ message: "Complaint fetched successfully", complaints: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createComplaintController = async (req, res) => {
  const { comentario, UtilizadoridUtilizador } = req.body;

  dataDenuncia = new Date();
  if (!comentario || !UtilizadoridUtilizador) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const result = await complaintService.createComplaint({
      comentario,
      dataDenuncia,
      UtilizadoridUtilizador,
    });
    res
      .status(201)
      .json({ message: "Complaint added successfully", complaints: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllComplaintsController,
  getComplaintByIdController,
  createComplaintController,
};
