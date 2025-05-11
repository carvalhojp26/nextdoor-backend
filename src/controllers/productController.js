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
  // Esta função é chamada para a rota GET /api/products/
  // Destinada a usuários não-admin para ver produtos da sua vizinhança.
  const userId = req.user.idUtilizador; // Do authenticateToken

  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12; // Ajuste o limite padrão conforme necessário

    console.log(`getProductController: Buscando produtos para usuário ID: ${userId}`);
    const user = await userService.getUser(userId); // Busca dados do usuário para obter VizinhancaidVizinhanca

    if (!user) {
      console.warn(`getProductController: Usuário com ID ${userId} não encontrado.`);
      return res.status(404).json({ message: "Usuário não encontrado.", products: [], totalItems: 0, currentPage: page, totalPages: 0 });
    }
    if (!user.VizinhancaidVizinhanca) {
      console.warn(`getProductController: Usuário ${userId} não está associado a uma vizinhança.`);
      return res.status(200).json({ message: "Utilizador não associado a uma vizinhança.", products: [], totalItems: 0, currentPage: page, totalPages: 0 });
    }

    const neighborhoodId = user.VizinhancaidVizinhanca;
    console.log(`getProductController: Buscando produtos para vizinhança ID: ${neighborhoodId}, Página: ${page}, Limite: ${limit}`);

    // Chama a função de serviço que filtra por vizinhança
    const result = await productService.getProductsByNeighborhoodForUser(neighborhoodId, page, limit);
    
    res.status(200).json({
      message: "Produtos da vizinhança do usuário carregados com sucesso.",
      products: result.products,
      totalItems: result.totalItems,
      currentPage: result.currentPage, // Vem do serviço
      totalPages: result.totalPages    // Vem do serviço
    });

  } catch (error) {
    console.error("Erro em getProductController (para vizinhança do usuário):", error);
    res.status(500).json({ error: "Erro interno do servidor ao buscar produtos." });
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

    // Desestruturar usando os nomes dos ATRIBUTOS do MODELO (que o frontend envia)
    const {
      nomeProduto,
      precoProduto,
      descricaoProduto,
      tipoProdutoId,                 // << NOME DO ATRIBUTO DO MODELO
      estadoProdutoidEstadoProduto,  // Nome do atributo do modelo
      estabelecimentoId,           // << NOME DO ATRIBUTO DO MODELO
      imagemProduto                  // Pegar do corpo (URL)
    } = req.body;

    console.log("BACKEND - createProductController - Corpo Recebido:", req.body);

    // Validação usando os nomes desestruturados (nomes dos atributos do modelo)
    if (
      !nomeProduto ||
      precoProduto === undefined || precoProduto < 0 ||
      !descricaoProduto ||
      // !imagemProduto || // Remova esta linha se imagemProduto for opcional
      !tipoProdutoId ||
      !estadoProdutoidEstadoProduto ||
      !estabelecimentoId
    ) {
      console.log("BACKEND - createProductController - Falha na Validação. Campos:", { nomeProduto, precoProduto, descricaoProduto, tipoProdutoId, estadoProdutoidEstadoProduto, estabelecimentoId, imagemProduto });
      return res.status(400).json({ error: "Campos obrigatórios ausentes ou inválidos." });
    }

    // productData DEVE usar os nomes dos ATRIBUTOS do modelo Produto
    const productData = {
      nomeProduto,
      precoProduto,
      descricaoProduto,
      imagemProduto: imagemProduto || null, // Vem do req.body, pode ser null se opcional
      tipoProdutoId,
      estadoProdutoidEstadoProduto,
      estabelecimentoId,
    };

    console.log("BACKEND - createProductController - Dados para o Serviço:", productData);

    const result = await productService.createProduct(productData);
    res
      .status(201)
      .json({ message: "Product added successfully", product: result });
  } catch (error) {
    console.error("BACKEND - Erro em createProductController:", error);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: error.errors.map(e => e.message).join(', ') });
    }
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

const getAllProductsAdminController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;

  try {
    console.log("CONTROLLER: getAllProductsAdminController - Iniciando"); // Log
    if (userType !== 1) {
      console.log("CONTROLLER: getAllProductsAdminController - Acesso negado (não é admin)"); // Log
      return res.status(403).json({ error: "Access denied. Only administrators can perform this action." });
    }

    const result = await productService.getAllProductsAdmin();
    console.log("CONTROLLER: getAllProductsAdminController - Dados recebidos do serviço, enviando para o cliente."); // Log

    res.status(200).json({ products: result.products }); // Envia apenas o array de produtos

  } catch (error) {
    // O console.error já está aqui e deve mostrar o erro original do serviço se ele ocorrer
    console.error("CONTROLLER ERROR: Error in getAllProductsAdminController:", error.message, error.stack);
    res.status(500).json({ error: "Internal server error while fetching all products." });
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
  getAllProductsAdminController,
};
