const productService = require("../services/productService")

const listProducts = async (req, res) => {
    try {
        const result = await productService.getProducts();
        res.json(result);
    } catch (error) {
        console.error("Error getting products from database: ", error);
        res.status(500).json("Internal server error");
    };
};

module.exports = { listProducts };