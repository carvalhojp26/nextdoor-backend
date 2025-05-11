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
        idProduto: productId,
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
      where: { tipoProdutoidTipoProduto: typeId },
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
    return products;
  } catch (error) {
    console.error("Error getting products in database:", error);
    throw error;
  }
};

const getProductByEstablishment = async (establishmentId, neighborhoodId) => {
  try {
    const product = await Produto.findOne({
      where: { EstabelecimentoidEstabelecimento: establishmentId },
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
    const product = await Produto.findOne({
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
        const offset = (page - 1) * limit;
        const { count, rows } = await Produto.findAndCountAll({
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            include: [
                {
                    model: Estabelecimento,
                    as: 'Estabelecimento', // << Frontend espera 'Estabelecimento'
                    where: { VizinhancaidVizinhanca: neighborhoodId },
                    required: true,
                    attributes: ['idEstabelecimento', 'nomeEstabelecimento'] // Inclui o nome
                },
                {
                    model: tipoProduto,    // Usa a variável importada 'tipoProduto'
                    as: 'tipoProduto',     // << Frontend espera 'tipoProduto' (minúsculo)
                    attributes: ['idTipoProduto', 'tipoProduto'] // Atributo 'tipoProduto' para o nome
                },
                {
                    model: estadoProduto,  // Usa a variável importada 'estadoProduto'
                    as: 'estadoProduto',   // << Frontend espera 'estadoProduto' (minúsculo)
                    attributes: ['idEstadoProduto', 'estadoProduto'] // Atributo 'estadoProduto' para o nome
                }
            ],
            order: [['nomeProduto', 'ASC']],
            distinct: true,
        });
        return {
          products: rows,
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page, 10)
        };
    } catch (error) {
        console.error(`Error fetching products for neighborhood ${neighborhoodId} in service:`, error);
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
};
