const neighborhoodService = require("../services/neighborhoodService")

const getNeighborhoodController = async (req, res) => {
  try {
    const result = await neighborhoodService.getNeighborhood();
    res.status(200).json({ message: "Neighborhoods fetched successfully", neighborhood: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createNeighborhoodController = async (req, res) => {
  try {
    const result = await neighborhoodService.createNeighborhood(req.body);
    res.status(201).json({ message: "Neighborhoods added successfully", neighborhood: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNeighborhoodController = async (req, res) => {
  const { neighborhoodId } = req.params;
  try {
    const result = await neighborhoodService.deleteNeighborhood(neighborhoodId);
    res.status(200).json({message: "Neighborhood deleted successfully", neighborhood: result,});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {getNeighborhoodController, createNeighborhoodController, deleteNeighborhoodController}