const productService = require("../services/productService")

const getProductByIdController = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productService.getProductById(productId);

    res.status(200).json({ message: "Product fetched successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: "Product not found" });
  }
};

const getProductByTypeController = async (req, res) => {
  
  try {
    const { typeId } = req.params;
    const product = await productService.getProductByType(typeId);
    res.status(200).json({ message: "Product fetched successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: "Product not found" });
  }
};

const getProductByEstablishmentController = async (req, res) => {
  try {
    const { establishmentId } = req.params;
    const product = await productService.getProductByEstablishment(establishmentId);
    res.status(200).json({ message: "Product fetched successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: "Establishment not found" });
  }
};

const getProductController = async (req, res) => {
    try {
        const result = await productService.getProduct();
        res.status(200).json({ message: "Products fetched successfully", product: result  });
    } catch (error) {
        res.status(500).json("Internal server error");
    };
};

const createProductController = async (req, res) => {
  try {
    const { nomeProduto, precoProduto, descricaoProduto, tipoProdutoidTipoProduto, estadoProdutoidEstadoProduto, EstabelecimentoidEstabelecimento } = req.body;
    const imagemProduto = req.file ? req.file.filename : null;

    if (!imagemProduto) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    const productData = {
      nomeProduto,
      precoProduto,
      descricaoProduto,
      imagemProduto,
      tipoProdutoidTipoProduto,
      estadoProdutoidEstadoProduto,
      EstabelecimentoidEstabelecimento
    };

    const result = await productService.createProduct(productData);
    res.status(201).json({ message: "Product added successfully", product: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

  const updateProductController = async (req, res) => {
      try {
        const { productId } = req.params;
        await productService.updateProduct(productId, req.body);
        res.status(200).json({ message: "Product updated successfully"});
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    };

  const deleteProductController = async (req, res) => {
      const { productId } = req.params;
      try {
        await productService.deleteProduct(productId);
        res.status(200).json({message: "Product deleted successfully"});
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    };

module.exports = { getProductByIdController, getProductByTypeController, getProductByEstablishmentController, getProductController, createProductController, updateProductController, deleteProductController };