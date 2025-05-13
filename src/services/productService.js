const {
  Produto,
  Estabelecimento,
  estadoProduto,
  tipoProduto,
  Endereco,
} = require("../models/association/associations");
const getProductById = async (productId, neighborhoodId) => {
  try {
    const product = await Produto.findOne({
      where: {
        idProduto: productId, estadoProdutoidEstadoProduto: 1
      },
      include: [
        {
          model: Estabelecimento,
          where: { VizinhancaidVizinhanca: neighborhoodId },
          include: [{ model: Endereco }],
        },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });

    return product;
  } catch (error) {
    console.error("Error getting product by ID from database:", error);
    throw error;
  }
};

const getProductByType = async (typeId, neighborhoodId) => {
  try {
    const product = await Produto.findAll({
      where: { tipoProdutoidTipoProduto: typeId, estadoProdutoidEstadoProduto: 1 },
      include: [
        {
          model: Estabelecimento,
          where: { VizinhancaidVizinhanca: neighborhoodId },
          include: [{ model: Endereco }],
        },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });

    return product;
  } catch (error) {
    console.error("Error getting product by type from database:", error);
    throw error;
  }
};

const getProduct = async (neighborhoodId) => {
  try {
    const products = await Produto.findAll({
      where: { estadoProdutoidEstadoProduto: 1 },
      include: [
        {
          model: Estabelecimento,
          where: { VizinhancaidVizinhanca: neighborhoodId},
          include: [{ model: Endereco }],
        },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });
    return products;
  } catch (error) {
    console.error("Error getting products in database:", error);
    throw error;
  }
};

const getProductByEstablishment = async (establishmentId, neighborhoodId) => {
  try {
    const product = await Produto.findAll({
      where: { EstabelecimentoidEstabelecimento: establishmentId, estadoProdutoidEstadoProduto: 1 },
      include: [
        {
          model: Estabelecimento,
          where: { VizinhancaidVizinhanca: neighborhoodId },
          include: [{ model: Endereco }],
        },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });

    return product;
  } catch (error) {
    console.error(
      "Error getting product by establishment from database:",
      error
    );
    throw error;
  }
};

const getProductByAllEstablishment = async (establishmentId) => {
  try {
    const product = await Produto.findAll({
      where: { EstabelecimentoidEstabelecimento: establishmentId },
      include: [
        { model: Estabelecimento, include: [{ model: Endereco }] },
        { model: estadoProduto },
        { model: tipoProduto },
      ],
    });

    return product;
  } catch (error) {
    console.error(
      "Error getting product by establishment from database:",
      error
    );
    throw error;
  }
};

const createProduct = async (body) => {
  try {
    const product = await Produto.create(body);
    return product;
  } catch (error) {
    console.error("Error adding product in database:", error);
    throw error;
  }
};

const updateProduct = async (productId, body) => {
  try {
    const [updatedRows] = await Produto.update(body, {
      where: { idProduto: productId },
    });
    return updatedRows;
  } catch (error) {
    console.error("Error updating product in database:", error);
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const deleted = await Produto.destroy({ where: { idProduto: productId } });
    return deleted;
  } catch (error) {
    console.error("Error deleting product in database:", error);
    throw error;
  }
};

const getAllProductsAdmin = async (page = 1, limit = 1000) => {
  try {
    const offset = (page - 1) * limit;
    console.log("SERVICE: getAllProductsAdmin - Adicionando include para estadoProduto");

    const { count, rows } = await Produto.findAndCountAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [['idProduto', 'DESC']],
      include: [
        {
          model: Estabelecimento,
          as: 'Estabelecimento',
          attributes: ['idEstabelecimento', 'nomeEstabelecimento']
        },
        {
          model: tipoProduto,
          as: 'tipoProduto',
          attributes: ['idTipoProduto', 'tipoProduto']
        },
        { // ADICIONANDO estadoProduto
          model: estadoProduto,   // A variável/modelo que você importou (minúsculo)
          as: 'estadoProduto',    // O alias definido na associação (minúsculo)
          attributes: ['idEstadoProduto', 'estadoProduto'] // << ATRIBUTO 'estadoProduto' para o nome
        }
      ],
      distinct: true,
    });

    console.log(`SERVICE: getAllProductsAdmin - Encontrados ${rows.length} produtos com todas as associações.`);
    return { products: rows, totalItems: count, totalPages: Math.ceil(count / limit), currentPage: parseInt(page, 10) };

  } catch (error) {
    console.error("SERVICE ERROR (getAllProductsAdmin - com estadoProduto):", error);
    if (error.parent) console.error("DB Parent Error (com estadoProduto):", error.parent.message);
    if (error.original) console.error("DB Original Error (com estadoProduto):", error.original.message);
    throw error;
  }
};




// E a função para buscar por vizinhança para utilizadores
const getProductsByNeighborhoodForUser = async (neighborhoodId, page = 1, limit = 12) => {
    try {
        console.log(`SERVICE getProductsByNeighborhoodForUser - Buscando produtos para neighborhoodId: ${neighborhoodId}, page: ${page}, limit: ${limit}`);
        const offset = (page - 1) * limit;
        const queryOptions = {
            attributes: [ 
                'idProduto', 'nomeProduto', 'precoProduto', 'descricaoProduto', 'imagemProduto', 'stockProduto',
                'tipoProdutoidTipoProduto',
                'estadoProdutoidEstadoProduto',
                'EstabelecimentoidEstabelecimento'
            ],
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            include: [
                {
                    model: Estabelecimento,
                    as: 'Estabelecimento', // Mantém se o alias está em associations.js
                    where: { VizinhancaidVizinhanca: neighborhoodId },
                    required: true, 
                    attributes: ['idEstabelecimento', 'nomeEstabelecimento']
                },
                {
                    model: tipoProduto,   // Usa o nome da variável importada
                    as: 'tipoProduto',    // Mantém se o alias está em associations.js
                    attributes: ['idTipoProduto', 'tipoProduto']
                },
                {
                    model: estadoProduto, // Usa o nome da variável importada
                    as: 'estadoProduto',  // Mantém se o alias está em associations.js
                    attributes: ['idEstadoProduto', 'estadoProduto']
                }
            ],
            where: { estadoProdutoidEstadoProduto: 1 }, 
            order: [['nomeProduto', 'ASC']],
            distinct: true,
            // logging: console.log // Descomenta para ver a query SQL
        };
        const { count, rows } = await Produto.findAndCountAll(queryOptions);
        // console.log("SERVICE getProductsByNeighborhoodForUser - Exemplo de produto:", rows.length > 0 ? JSON.stringify(rows[0], null, 2) : "Nenhum produto encontrado");
        return { products: rows, totalItems: count, totalPages: Math.ceil(count / limit), currentPage: parseInt(page, 10) };
    } catch (error) { /* ... tratamento de erro ... */ throw error; }
};

const getProductByIdAndNeighborhood = async (productId, neighborhoodId) => {
  try {
    console.log(`SERVICE getProductByIdAndNeighborhood - productId: ${productId}, neighborhoodId: ${neighborhoodId}`);
    const product = await Produto.findOne({
      attributes: [ /* ... define os atributos que queres para Produto ... */ ],
      where: {
        idProduto: productId,
        estadoProdutoidEstadoProduto: 1 
      },
      include: [
        {
          model: Estabelecimento,
          as: 'Estabelecimento',
          where: { VizinhancaidVizinhanca: neighborhoodId },
          required: true, 
        },
        { model: estadoProduto, as: 'estadoProduto' },
        { model: tipoProduto, as: 'tipoProduto' },
      ],
    });
    return product;
  } catch (error) {
    console.error("SERVICE ERROR: getProductByIdAndNeighborhood -", error.message, error.stack);
    throw error;
  }
};

const getProductByTypeAndNeighborhood = async (typeId, neighborhoodId, page = 1, limit = 12) => {
  try {
    console.log(`SERVICE getProductByTypeAndNeighborhood - typeId: ${typeId}, neighborhoodId: ${neighborhoodId}, page: ${page}, limit: ${limit}`);
    const offset = (page - 1) * limit;
    const { count, rows } = await Produto.findAndCountAll({
      attributes: [ /* ... define os atributos ... */ ],
      where: {
        tipoProdutoidTipoProduto: typeId,
        estadoProdutoidEstadoProduto: 1
      },
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: [
        {
          model: Estabelecimento,
          as: 'Estabelecimento',
          where: { VizinhancaidVizinhanca: neighborhoodId },
          required: true,
          attributes: ['idEstabelecimento', 'nomeEstabelecimento'],
        },
        { model: tipoProduto, as: 'tipoProduto' },
      ],
      order: [['nomeProduto', 'ASC']],
      distinct: true,
    });
     return { products: rows, totalItems: count, totalPages: Math.ceil(count / limit), currentPage: parseInt(page, 10) };
  } catch (error) {
    console.error("SERVICE ERROR: getProductByTypeAndNeighborhood -", error.message, error.stack);
    throw error;
  }
};

const getProductsByEstablishmentAndNeighborhood = async (establishmentId, neighborhoodId, page = 1, limit = 12) => {
  try {
    console.log(`SERVICE getProductsByEstablishmentAndNeighborhood - Buscando produtos para establishmentId: ${establishmentId}, neighborhoodId: ${neighborhoodId}, page: ${page}, limit: ${limit}`);
    const offset = (page - 1) * limit;

    const queryOptions = {
      attributes: [ // Seleciona explicitamente os campos da tabela Produto que o frontend precisa
        'idProduto',
        'nomeProduto',
        'precoProduto',
        'descricaoProduto',
        'imagemProduto',
        'stockProduto',
        'tipoProdutoidTipoProduto', // Importante para o frontend saber o tipo (mesmo que o objeto tipoProduto seja incluído)
        'estadoProdutoidEstadoProduto',
        'EstabelecimentoidEstabelecimento'
      ],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      where: {
        EstabelecimentoidEstabelecimento: establishmentId, // Filtra pelo ID do estabelecimento fornecido
        estadoProdutoidEstadoProduto: 1                  // Apenas produtos ativos
      },
      include: [
        {
          model: Estabelecimento,
          as: 'Estabelecimento', // Alias da associação Produto -> Estabelecimento
          where: { VizinhancaidVizinhanca: neighborhoodId }, // Garante que este estabelecimento está na vizinhança do utilizador
          required: true, // Torna este um INNER JOIN efetivamente para esta condição
          attributes: ['idEstabelecimento', 'nomeEstabelecimento'],
          // Se precisares do endereço do estabelecimento:
          // include: [{ model: Endereco, as: 'EnderecoEstabelecimento', attributes: [/* campos do endereço */] }]
        },
        {
          model: TipoProduto,   // Nome da variável do modelo TipoProduto como importado
          as: 'tipoProduto',    // Alias da associação Produto -> TipoProduto
          attributes: ['idTipoProduto', 'tipoProduto'] // 'tipoProduto' aqui é o nome do tipo
        },
        {
          model: EstadoProduto, // Nome da variável do modelo EstadoProduto como importado
          as: 'estadoProduto',  // Alias da associação Produto -> EstadoProduto
          attributes: ['idEstadoProduto', 'estadoProduto'] // 'estadoProduto' aqui é o nome do estado
        }
      ],
      order: [['nomeProduto', 'ASC']],
      distinct: true, // Importante quando se usa include com limit/offset para evitar duplicados na contagem
      // logging: console.log // Descomenta para ver a query SQL gerada, útil para depuração
    };

    console.log("SERVICE getProductsByEstablishmentAndNeighborhood - Opções da Query:", JSON.stringify(queryOptions, null, 2));
    const { count, rows } = await Produto.findAndCountAll(queryOptions);

    console.log(`SERVICE getProductsByEstablishmentAndNeighborhood - Produtos encontrados: ${rows.length}, Total: ${count}`);
    if (rows.length > 0) {
        // console.log("SERVICE getProductsByEstablishmentAndNeighborhood - Exemplo de produto:", JSON.stringify(rows[0].get({ plain: true }), null, 2));
    }


    return {
      products: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10)
    };

  } catch (error) {
    console.error(`SERVICE ERROR: getProductsByEstablishmentAndNeighborhood (establishment ${establishmentId}, neighborhood ${neighborhoodId}) -`, error.message, error.stack);
    if (error.original) {
        console.error("Original Sequelize Error:", error.original);
    }
    throw error; // Relança o erro para ser tratado pelo controlador
  }
};

const getProductByIdForUpdate = async (productId, transaction = null, lock = false) => {
  try {
    const options = {
      where: { idProduto: productId },
    };
    if (transaction) {
      options.transaction = transaction;
      if (lock) {
        options.lock = transaction.LOCK.UPDATE; // Lock pessimista
      }
    }
    // Adicionar includes se o product retornado precisar de dados associados
    // options.include = [{ model: EstadoProduto, as: 'estadoProduto' }]; 
    const product = await Produto.findOne(options);
    return product;
  } catch (error) {
    console.error(`SERVICE_ERROR: getProductByIdForUpdate (productId: ${productId}) -`, error);
    throw error;
  }
};

// Função para atualizar produto, aceitando uma transação
const updateProductDetails = async (productId, updateData, transaction = null) => {
  try {
    const options = {
      where: { idProduto: productId },
    };
    if (transaction) {
      options.transaction = transaction;
    }
    const [updatedRows] = await Produto.update(updateData, options);
    if (updatedRows === 0) {
        // Não necessariamente um erro se nenhum campo mudou, mas pode indicar produto não encontrado
        // console.warn(`Product with ID ${productId} not found or no changes made.`);
    }
    return updatedRows; // Retorna o número de linhas afetadas
  } catch (error) {
    console.error(`SERVICE_ERROR: updateProductDetails (productId: ${productId}) -`, error);
    throw error;
  }
};


module.exports = {
  getProductById,
  getProductByType,
  getProduct,
  getProductByEstablishment,
  getProductByAllEstablishment,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin,
  getProductsByNeighborhoodForUser,
  getProductByIdAndNeighborhood,
  getProductByTypeAndNeighborhood,
  getProductsByEstablishmentAndNeighborhood,
  getProductByIdForUpdate,
  updateProductDetails,
};
