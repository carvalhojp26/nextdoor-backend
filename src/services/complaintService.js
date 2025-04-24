const {
    Utilizador,
    Denuncia
  } = require("../models/association/associations");
  

const getComplaint = async () => {
    try {
      const complaints = await Denuncia.findAll({
        include: [
          { model: Utilizador },
        ],
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
  const deleteComplaint = async (idDenuncia) => {
    try {
      const deleted = await Denuncia.destroy({ where: { idDenuncia } });
      return deleted;
    } catch (error) {
      console.error("Error deleting complaint in database:", error);
      throw error;
    }
  };

  module.exports = { getComplaint, createComplaint, deleteComplaint};