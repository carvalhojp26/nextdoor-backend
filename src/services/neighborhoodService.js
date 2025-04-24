const { Vizinhanca } = require("../models/associations");

const getNeighborhood = async () => {
  try {
    const neighborhoods = await Vizinhanca.findAll({
    });
    return neighborhoods;
  } catch (error) {
    console.error("Error getting neighborhoods in database:", error);
    throw error;
  }
};

const createNeighborhood = async (body) => {
  try {
    const neighborhood = await Vizinhanca.create(body);
    return neighborhood;
  } catch (error) {
    console.error("Error adding user in database:", error);
    throw error;
  }
};

module.exports = {getNeighborhood, createNeighborhood}