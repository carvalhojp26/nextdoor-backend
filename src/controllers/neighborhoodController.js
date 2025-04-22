const neighborhoodService = require("../services/neighborhoodService")

const listNeighborhoods = async (req, res) => {
  try {
    const result = await neighborhoodService.getNeighborhood();
    res.status(200).json({ message: "Neighborhoods fetched successfully", neighborhood: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addNeighborhoods = async (req, res) => {
  try {
    const result = await neighborhoodService.insertNeighborhood(req.body);
    res.status(201).json({ message: "Neighborhoods added successfully", neighborhood: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {listNeighborhoods, addNeighborhoods}