const productService = require("../services/productService")

const listProducts = async (req, res) => {
    try {
        const result = await productService.getProducts();
        res.status(200).json({ message: "Products fetched successfully", product: result  });
    } catch (error) {
        console.error("Error getting products from database: ", error);
        res.status(500).json("Internal server error");
    };
};

  const addProduct = async (req, res) => {
    try {
      const result = await productService.insertProduct(req.body);
      res.status(201).json({ message: "Product added successfully", product: result  });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const editProduct = async (req, res) => {
      try {
        const { productId } = req.params;
        const result = await productService.updateProduct(productId, req.body);
        res.status(200).json({ message: "Product updated successfully", product: result });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    };

module.exports = { listProducts, addProduct, editProduct };