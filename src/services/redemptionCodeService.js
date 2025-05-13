// services/redemptionCodeService.js
const { sequelize } = require("../models/association/associations");
const {
  resgateCodigo,
  Produto, 
  Utilizador,
  estadoResgate,
  Estabelecimento,
  Vizinhanca,
} = require("../models/association/associations");

const { fetchUserByIdInternal, updateUserDetails } = require("./userService");
const { getProductByIdForUpdate, updateProductDetails } = require("./productService");

const generateCode = (userId, productId) => { /* ... tua função ... */ return `${userId}${productId}${Date.now()}`.slice(-8).toUpperCase(); };

const redeemProduct = async (userId, productId) => {
  const ID_ESTADO_PRODUTO_ATIVO = 1;
  const ID_ESTADO_PRODUTO_NAO_VISIVEL = 2;
  const ID_ESTADO_RESGATE_CRIADO = 1;

  const t = await sequelize.transaction();

  try {
    const user = await fetchUserByIdInternal(userId);
    if (!user) throw new Error("Utilizador não encontrado.");

    const product = await getProductByIdForUpdate(productId, t, true);
    if (!product) { await t.rollback(); throw new Error("Produto não encontrado."); }
    if (product.estadoProdutoidEstadoProduto !== ID_ESTADO_PRODUTO_ATIVO) { await t.rollback(); throw new Error("Este produto não está atualmente disponível para resgate.");}
    if (product.stockProduto <= 0) {
      if (product.estadoProdutoidEstadoProduto !== ID_ESTADO_PRODUTO_NAO_VISIVEL) {
        await updateProductDetails(productId, { estadoProdutoidEstadoProduto: ID_ESTADO_PRODUTO_NAO_VISIVEL }, t);
      }
      await t.rollback(); throw new Error("Produto esgotado.");
    }
    if (user.pontosUtilizador < product.precoProduto) { await t.rollback(); throw new Error("Pontos insuficientes para resgatar este produto.");}

    const novosPontos = user.pontosUtilizador - product.precoProduto;
    const userUpdateResult = await updateUserDetails(userId, { pontosUtilizador: novosPontos }, t);
    if (userUpdateResult[0] === 0) { await t.rollback(); throw new Error("Falha ao atualizar os pontos do utilizador.");}

    const novoStock = product.stockProduto - 1;
    const productUpdateData = { stockProduto: novoStock };
    if (novoStock === 0) {
      productUpdateData.estadoProdutoidEstadoProduto = ID_ESTADO_PRODUTO_NAO_VISIVEL;
    }
    const productUpdateResult = await updateProductDetails(productId, productUpdateData, t);
    if (productUpdateResult[0] === 0) { await t.rollback(); throw new Error("Falha ao atualizar o stock do produto.");}

    const code = generateCode(userId, productId);
    const redemptionDate = new Date();

    const newRedemptionCode = await resgateCodigo.create({
      dataResgate: redemptionDate,
      ProdutoidProduto: productId,
      estadoResgateidEstadoResgate: ID_ESTADO_RESGATE_CRIADO,
      codigo: code,
      UtilizadoridUtilizador: userId,
    }, { transaction: t });

    await t.commit();

    // Buscar com include APÓS o commit
    // Como não há 'as' na associação resgateCodigo.belongsTo(Produto),
    // o Sequelize usará o nome do modelo 'Produto' como chave para o objeto incluído.
    const createdCodeWithDetails = await resgateCodigo.findByPk(newRedemptionCode.idResgate, {
        include: [
            { 
              model: Produto, // Usa o nome do modelo importado
              // SEM 'as' aqui, porque não foi definido na associação
              attributes: ['nomeProduto', 'precoProduto', 'imagemProduto'] 
            }
            // Podes adicionar include para Utilizador e estadoResgate se necessário aqui também,
            // usando os seus respectivos modelos e aliases (se definidos) ou nomes de modelo.
            // Ex: { model: Utilizador, as: 'UtilizadorQueResgatou' }, se 'UtilizadorQueResgatou' for o alias
            // Ex: { model: estadoResgate, as: 'estadoDoResgate' }, se 'estadoDoResgate' for o alias
        ]
    });
    
    // Se a busca acima falhar (improvável se o ID é válido e a associação está correta)
    // ou se preferires não fazer esta segunda busca, podes construir o objeto de resposta manualmente.
    if (createdCodeWithDetails) {
        return createdCodeWithDetails;
    } else {
        // Fallback: Retorna o código criado e adiciona os detalhes do produto manualmente
        // Isto evita que um erro na busca do 'include' cause o erro de rollback da transação principal.
        console.warn("redeemProduct: Não foi possível buscar createdCodeWithDetails com include. Retornando dados básicos.");
        const productDetailsForResponse = {
            nomeProduto: product.nomeProduto,
            precoProduto: product.precoProduto,
            imagemProduto: product.imagemProduto
        };
        // O nome da propriedade para o produto aninhado será 'Produto' (nome do modelo)
        return {
            ...newRedemptionCode.get({ plain: true }),
            Produto: productDetailsForResponse // <<< O frontend precisará esperar por 'Produto'
        };
    }

  } catch (error) {
    if (t && !t.finished) { // t.finished pode ser 'commit', 'rollback', ou undefined antes de qualquer um
        try { await t.rollback(); } catch (rollbackError) { console.error("Error during forced transaction rollback:", rollbackError); }
    }
    console.error("SERVICE ERROR: redeemProduct - ", error.message);
    throw error; 
  }
};

const getAllRedemptionCodesAdmin = async (page = 1, limit = 15) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await resgateCodigo.findAndCountAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: [
        { 
          model: Produto,
          attributes: [
            'idProduto', 
            'nomeProduto', 
            'imagemProduto', 
            'precoProduto', // Pontos no momento do resgate
            'descricaoProduto' // <<< ADICIONADO DESCRIÇÃO DO PRODUTO
          ], 
          include: [{
            model: Estabelecimento,
            as: 'Estabelecimento', // Usa o alias da tua associação Produto.belongsTo(Estabelecimento)
            attributes: ['idEstabelecimento', 'nomeEstabelecimento'],
            include: [{
                model: Vizinhanca,
                as: 'Vizinhanca', // Usa o alias da tua associação Estabelecimento.belongsTo(Vizinhanca)
                attributes: ['idVizinhanca', 'nomeFreguesia']
            }]
          }]
        },
        { 
          model: Utilizador,
          attributes: [
            'idUtilizador', 
            'nomeUtilizador', 
            'emailUtilizador',
            'VizinhançaidVizinhança' // <<< ADICIONADO ID DA VIZINHANÇA DO UTILIZADOR
          ], 
          include: [{
            model: Vizinhanca,
            as: 'Vizinhanca', // Usa o alias da tua associação Utilizador.belongsTo(Vizinhanca)
            attributes: ['idVizinhanca', 'nomeFreguesia']
          }]
        },
        { 
          model: estadoResgate,
          attributes: ['idEstadoResgate', 'estadoResgate'] 
        }
      ],
      order: [['dataResgate', 'DESC']],
      distinct: true
    });
    
    const codesWithProductPoints = rows.map(codeInstance => {
        const code = codeInstance.get({ plain: true });
        if (code.Produto) {
            code.pontosProduto = code.Produto.precoProduto; 
        }
        return code;
    });

    return { 
        redemptionCodes: codesWithProductPoints, 
        totalItems: count, 
        totalPages: Math.ceil(count / limit), 
        currentPage: parseInt(page, 10) 
    };
  } catch (error) {
    console.error("SERVICE ERROR: getAllRedemptionCodesAdmin -", error.message, error.stack);
    if (error.original) console.error("Original Sequelize Error:", error.original);
    throw error;
  }
};



// ... (resto do teu redemptionCodeService.js e exports)
// Certifica-te de exportar redeemProduct
module.exports = { 
    //getRedemptionsCode, // Se esta função também usa includes, verifica os aliases nela
    redeemProduct,
    getAllRedemptionCodesAdmin,
};