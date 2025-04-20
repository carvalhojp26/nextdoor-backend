const rateService = require("../services/rateService");

const listRates = async (req, res) => {
  try {
    const result = await rateService.getRates();
    res.json(result);
  } catch (error) {
    console.error("Error getting rates in database: ", error);
    res.status(500).json("Internal server error.");
  }
};

const addRate = async (req, res) => {
  try {
    const result = await rateService.insertRate(req.body);
    res.status(201).json({ message: "Rate added successfully" });
    res.json(result);
  } catch (error) {
    console.error("Error adding rate in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { listRates, addRate };
