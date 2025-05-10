const { categoriaTarefa } = require("../models/association/associations");

const getCategories = async () => {
  try {
    const categories = await categoriaTarefa.findAll();
    return categories;
  } catch (error) {
    console.error("Error getting neighborhoods in database:", error);
    throw error;
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const categories = await categoriaTarefa.findOne({
      where: { idCategoriaTarefa: categoryId },
    });
    return categories;
  } catch (error) {
    console.error("Error getting neighborhoods in database:", error);
    throw error;
  }
};

module.exports = { getCategories, getCategoryById };
