// src/controllers/productController.js
const productService = require("../services/productService");
const userService = require("../services/userService"); // Removido se não usado aqui

// --- Controladores GET existentes (mantidos como no teu original) ---
const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  try {
    if (!req.user || !req.user.idUtilizador) return res.status(401).json({ error: "Não autenticado." });
    const user = await userService.fetchUserByIdInternal(req.user.idUtilizador);
    if (!user || (user.VizinhançaidVizinhança === null || user.VizinhançaidVizinhança === undefined)) {
        return res.status(400).json({ error: "Utilizador ou vizinhança inválidos para validar o produto."});
    }
    // CHAMA A FUNÇÃO CORRETA DO productService
    const product = await productService.getProductByIdAndNeighborhood(productId, user.VizinhançaidVizinhança); 
    if (!product) return res.status(404).json({ error: "Produto não encontrado ou não pertence à sua vizinhança." });
    res.status(200).json({ message: "Produto obtido com sucesso", product });
  } catch (error) { /* ... tratamento de erro ... */ }
};



const getProductByTypeController = async (req, res) => {
  const { typeId } = req.params;
  try {
    if (!req.user || !req.user.idUtilizador) return res.status(401).json({ error: "Não autenticado." });
    const user = await userService.fetchUserByIdInternal(req.user.idUtilizador);
    if (!user || (user.VizinhançaidVizinhança === null || user.VizinhançaidVizinhança === undefined)) {
        return res.status(400).json({ error: "Utilizador ou vizinhança inválidos para filtrar por tipo."});
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    // CHAMA A FUNÇÃO CORRETA DO productService
    const result = await productService.getProductByTypeAndNeighborhood(typeId, user.VizinhançaidVizinhança, page, limit); 
    res.status(200).json({ message: "Produtos obtidos com sucesso por tipo", ...result });
  } catch (error) { /* ... tratamento de erro ... */ }
};

const getProductController = async (req, res) => {
  // const userId = req.user.idUtilizador; // Mesma consideração
  try {
    // const user = await userService.getUser(userId);
    // const neighborhoodId = user.VizinhançaidVizinhança;
    // Se esta é a rota geral para user, getProductsByNeighborhoodForUser seria mais apropriada
    // Se for para admin, getAllProductsAdmin é a rota.
    // Esta função 'getProduct' parece genérica demais, precisa de clarificação do seu propósito.
    // Vou assumir que é para um utilizador ver produtos da sua vizinhança.
    // Se for esse o caso, o serviço getProductsByNeighborhoodForUser deveria ser chamado aqui.
    // Por agora, vou manter a chamada original, mas alerta para a necessidade de clarificação.
    const result = await productService.getProduct(/* neighborhoodId */);
    res.status(200).json({ message: "Produtos obtidos com sucesso", products: result });
  } catch (error) {
    console.error("CONTROLLER ERROR: getProductController -", error.message, error.stack);
    res.status(500).json({ error: "Erro interno ao buscar produtos." });
  }
};

const getProductByEstablsihmentController = async (req, res) => {
  const { establishmentId } = req.params;
  try {
    if (!req.user || !req.user.idUtilizador) return res.status(401).json({ error: "Não autenticado." });
    
    const user = await userService.fetchUserByIdInternal(req.user.idUtilizador);
    if (!user || (user.VizinhançaidVizinhança === null || user.VizinhançaidVizinhança === undefined)) {
        return res.status(400).json({ error: "Utilizador ou vizinhança inválidos."});
    }
    const neighborhoodId = user.VizinhançaidVizinhança;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    // Precisarás de uma função no productService que filtre por establishmentId E neighborhoodId
    const result = await productService.getProductsByEstablishmentAndNeighborhood(establishmentId, neighborhoodId, page, limit);

    if (!result || result.products.length === 0) {
        return res.status(404).json({ error: "Nenhum produto encontrado para este estabelecimento na sua vizinhança." });
    }
    res.status(200).json({ message: "Produtos do estabelecimento na vizinhança obtidos com sucesso", ...result });

  } catch (error) {
    console.error("CONTROLLER ERROR: getProductByEstablsihmentController -", error.message, error.stack);
    res.status(500).json({ error: "Erro interno ao buscar produtos do estabelecimento." });
  }
};

// --- Controladores Admin ---
const getProductByAllEstablishmentController = async (req, res) => { // Rota Admin
  const userType = req.user.idTipoUtilizador;
  const { establishmentId } = req.params;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    }
    const products = await productService.getProductByAllEstablishment(establishmentId); // Nome da var products
    if (!products || products.length === 0) {
        return res.status(404).json({ error: "Nenhum produto encontrado para este estabelecimento." });
    }
    res.status(200).json({ message: "Produtos obtidos com sucesso", products: products }); // products
  } catch (error) {
    console.error("CONTROLLER ERROR: getProductByAllEstablishmentController -", error.message, error.stack);
    res.status(500).json({ error: "Erro interno ao buscar produtos por estabelecimento (admin)." });
  }
};

const createProductController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    }

    // imagemProduto virá diretamente do body como string (URL)
    const {
      nomeProduto,
      precoProduto,
      descricaoProduto,
      tipoProdutoidTipoProduto,
      estadoProdutoidEstadoProduto,
      EstabelecimentoidEstabelecimento,
      stockProduto,
      imagemProduto, // <<< Recebe como string (URL)
    } = req.body;

    // REMOVER: const imagemProdutoFile = req.file ? req.file.path : null;

    // ... (validações existentes para outros campos) ...
    // Adicionar validação para o URL da imagem se necessário (formato, etc.)
    if (imagemProduto && typeof imagemProduto !== 'string') {
        return res.status(400).json({ error: "URL da imagem inválido." });
    }
    // ...

    const productData = {
      nomeProduto: nomeProduto.trim(),
      precoProduto,
      descricaoProduto: descricaoProduto.trim(),
      imagemProduto: imagemProduto ? imagemProduto.trim() : null, // Usa diretamente a string
      tipoProdutoidTipoProduto,
      estadoProdutoidEstadoProduto,
      EstabelecimentoidEstabelecimento,
      stockProduto,
    };

    const newProduct = await productService.createProduct(productData);
    res.status(201).json({ message: "Produto adicionado com sucesso", product: newProduct });
  } catch (error) {
    // ... (tratamento de erro existente) ...
    console.error("CONTROLLER ERROR: createProductController -", error.message, error.stack);
    if (error.status) { 
        return res.status(error.status).json({ error: error.message, details: error.details });
    }
    // ... (outros tratamentos de erro específicos) ...
    res.status(500).json({ error: "Erro interno ao criar o produto." });
  }
};

const updateProductController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    }
    const { productId } = req.params;
    const updates = { ...req.body }; // updates contém os campos enviados, incluindo imagemProduto como string

    // REMOVER: if (req.file) { updates.imagemProduto = req.file.path; } ...

    // Validação para o URL da imagem se estiver presente em updates
    if (updates.hasOwnProperty('imagemProduto')) {
        if (updates.imagemProduto === null || (typeof updates.imagemProduto === 'string' && updates.imagemProduto.trim() === '')) {
            updates.imagemProduto = null; // Permitir limpar a imagem
        } else if (typeof updates.imagemProduto !== 'string' || !(updates.imagemProduto.startsWith('http://') || updates.imagemProduto.startsWith('https://'))) {
            return res.status(400).json({ error: "URL da imagem inválido para atualização." });
        }
    }
    // ... (outras validações para campos em updates) ...


    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "Nenhum dado fornecido para atualização." });
    }

    const updatedProduct = await productService.updateProduct(productId, updates);
    res.status(200).json({ message: "Produto atualizado com sucesso", product: updatedProduct });
  } catch (error) {
    // ... (tratamento de erro existente) ...
    console.error("CONTROLLER ERROR: updateProductController -", error.message, error.stack);
    if (error.status) {
        return res.status(error.status).json({ error: error.message, details: error.details });
    }
    // ... (outros tratamentos de erro específicos) ...
    res.status(500).json({ error: "Erro interno ao atualizar o produto." });
  }
};

const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    }
    await productService.deleteProduct(productId);
    res.status(200).json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("CONTROLLER ERROR: deleteProductController -", error.message, error.stack);
    if (error.status === 404) {
        return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro interno ao excluir o produto." });
  }
};

const getAllProductsAdminController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    }
    const result = await productService.getAllProductsAdmin(); // Assume paginação default no serviço
    res.status(200).json({ message: "Produtos (admin) obtidos com sucesso", ...result }); // Envia products, totalItems, etc.
  } catch (error) {
    console.error("CONTROLLER ERROR: getAllProductsAdminController -", error.message, error.stack);
    res.status(500).json({ error: "Erro interno ao buscar todos os produtos (admin)." });
  }
};

const getProductsByMyNeighborhoodController = async (req, res) => {
  try {
    // ... (lógica para obter userId e neighborhoodId como antes) ...
    if (!req.user || !req.user.idUtilizador) { /* ... erro 401 ... */ }
    const userId = req.user.idUtilizador;
    const user = await userService.fetchUserByIdInternal(userId);
    if (!user || (user.VizinhançaidVizinhança === null || user.VizinhançaidVizinhança === undefined)) { /* ... erro 404/400 ... */ }
    const neighborhoodId = user.VizinhançaidVizinhança;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12; 

    // Chama a função correta do productService
    const result = await productService.getProductsByNeighborhoodForUser(neighborhoodId, page, limit); 
    res.status(200).json({ message: "Produtos da vizinhança obtidos com sucesso", ...result });
  } catch (error) { /* ... tratamento de erro ... */ }
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
  getProductsByMyNeighborhoodController,
};