const { where } = require("sequelize");
const { Utilizador, Denuncia } = require("../models/association/associations");

const getAllComplaints = async () => {
  try {
    const complaints = await Denuncia.findAll({
      include: [{ model: Utilizador }],
    });
    return complaints;
  } catch (error) {
    console.error("Error getting complaint in database:", error);
    throw error;
  }
};

const getComplaintById = async (complaintId) => {
  try {
    const complaints = await Denuncia.findAll({
      where: { idDenuncia: complaintId },
      include: [{ model: Utilizador }],
    });
    return complaints;
  } catch (error) {
    console.error("Error getting complaint in database:", error);
    throw error;
  }
};

const createComplaint = async (body) => {
  try {
    const complaint = await Denuncia.create(body);
    return complaint;
  } catch (error) {
    console.error("Error adding complaint in database:", error);
    throw error;
  }
};

module.exports = { getAllComplaints, getComplaintById, createComplaint };
