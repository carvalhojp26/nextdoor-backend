const productService = require("../services/productService");
const userService = require("../services/userService");

const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.idUtilizador;
  try {
    const user = await userService.getUser(userId);
    const neighborhoodId = user.VizinhançaidVizinhança;
    const product = await productService.getProductById(
      productId,
      neighborhoodId
    );

    res
      .status(200)
      .json({ message: "Products fetched successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: "Product not found" });
  }
};

const getProductByTypeController = async (req, res) => {
  const { typeId } = req.params;
  const userId = req.user.idUtilizador;
  try {
    const user = await userService.getUser(userId);
    const neighborhoodId = user.VizinhançaidVizinhança;
    const products = await productService.getProductByType(
      typeId,
      neighborhoodId
    );
    res
      .status(200)
      .json({ message: "Products fetched successfully", products: products });
  } catch (error) {
    res.status(500).json({ error: "Product not found" });
  }
};

const getProductController = async (req, res) => {
  const userId = req.user.idUtilizador;

  try {
    const user = await userService.getUser(userId);
    const neighborhoodId = user.VizinhançaidVizinhança;
    const result = await productService.getProduct(neighborhoodId);

    res
      .status(200)
      .json({ message: "Products fetched successfully", products: result });
  } catch (error) {
    console.error("Error in getProductController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductByEstablsihmentController = async (req, res) => {
  const userId = req.user.idUtilizador;
  const { establishmentId } = req.params;

  try {
    const user = await userService.getUser(userId);
    const neighborhoodId = user.VizinhançaidVizinhança;

    const result = await productService.getProductByEstablishment(establishmentId, neighborhoodId);

    res
      .status(200)
      .json({ message: "Products fetched successfully", products: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Admin
const getProductByAllEstablishmentController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  const { establishmentId } = req.params;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const product = await productService.getProductByAllEstablishment(
      establishmentId
    );
    res
      .status(200)
      .json({ message: "Product fetched successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: "Establishment not found" });
  }
};

const createProductController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const {
      nomeProduto,
      precoProduto,
      descricaoProduto,
      tipoProdutoidTipoProduto,
      estadoProdutoidEstadoProduto,
      EstabelecimentoidEstabelecimento,
    } = req.body;
    const imagemProduto = req.file ? req.file.filename : null;

    const productData = {
      nomeProduto,
      precoProduto,
      descricaoProduto,
      imagemProduto,
      tipoProdutoidTipoProduto,
      estadoProdutoidEstadoProduto,
      EstabelecimentoidEstabelecimento,
    };

    if (
      !nomeProduto ||
      !precoProduto ||
      !descricaoProduto ||
      !imagemProduto ||
      !tipoProdutoidTipoProduto ||
      !estadoProdutoidEstadoProduto ||
      !EstabelecimentoidEstabelecimento
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const result = await productService.createProduct(productData);
    res
      .status(201)
      .json({ message: "Product added successfully", product: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProductController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const { productId } = req.params;
    await productService.updateProduct(productId, req.body);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    await productService.deleteProduct(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProductByIdController,
  getProductByTypeController,
  getProductController,
  getProductByEstablsihmentController,
  getProductByAllEstablishmentController,
  createProductController,
  updateProductController,
  deleteProductController,
};
