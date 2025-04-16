const storeService = require("../services/storeService");

const listStores = async (req, res) => {
    try {
        const result = await storeService.getStores();
        res.json(result);
    } catch (error) {
        console.error("Error getting stores in database: ", error);
        res.status(500).json("Internal server error.");
    }
}

module.exports = { listStores };