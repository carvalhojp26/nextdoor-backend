const redemptionCodeService = require("../services/redemptionCodeService")

const listRedemptionCodes = async (req, res) => {
    try {
        const result = await redemptionCodeService.getRedemptionCodes();
        res.status(200).json({ message: "Redemption codes fetched successfully", redemptionCodes: result  });
    } catch (error) {
        res.status(500).json("Internal server error");
    };
};

  const addRedemptionCodes = async (req, res) => {
    try {
      const result = await redemptionCodeService.insertRedemptionCode(req.body);
      res.status(201).json({ message: "Redemption code added successfully", redemptionCodes: result  });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = { listRedemptionCodes, addRedemptionCodes };