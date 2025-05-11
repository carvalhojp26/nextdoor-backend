 const categoryService = require("../services/categoryService")

const getCategoryController = async (req, res) => {
  try {
    const result = await categoryService.getCategories();
    res
      .status(200)
      .json({ message: "Categories fetched successfully", categories: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCategoryByIdController = async (req, res) => {
  const {categoryId} = req.params;
  try {
    const result = await categoryService.getCategoryById(categoryId);
    res
      .status(200)
      .json({ message: "Categorie fetched successfully", categories: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {getCategoryController, getCategoryByIdController}
