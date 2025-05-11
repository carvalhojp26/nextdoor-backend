// src/models/products/productModel.js
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    "Produto",
    {
      idProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomeProduto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precoProduto: {
        type: DataTypes.INTEGER, // Ou DECIMAL se precisar de centavos
        allowNull: false
      },
      descricaoProduto: {
        type: DataTypes.STRING, // Pode ser TEXT para descrições mais longas
        allowNull: false
      },
      imagemProduto: { // Para a URL da imagem
        type: DataTypes.STRING,
        allowNull: true, // TORNE OPCIONAL SE O FRONTEND ENVIA NULL/STRING VAZIA
      },
      // --- DEFININDO ATRIBUTOS PARA CHAVES ESTRANGEIRAS ---
      estabelecimentoId: { // Nome do ATRIBUTO no modelo
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'EstabelecimentoidEstabelecimento' // Nome da COLUNA na tabela do BD
      },
      tipoProdutoId: { // Nome do ATRIBUTO no modelo
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'tipoProdutoidTipoProduto' // Nome da COLUNA na tabela do BD
      },
      estadoProdutoidEstadoProduto: { // Pode manter este nome longo como atributo se quiser
        type: DataTypes.INTEGER,
        allowNull: false
        // Ou, para consistência:
        // estadoProdutoId: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        //   field: 'estadoProdutoidEstadoProduto'
        // }
      }
    },
    {
      tableName: "Produto",
      timestamps: false,
    }
  );

  // As associações usarão as foreignKeys que correspondem aos ATRIBUTOS do modelo
  Produto.associate = function(models) {
    Produto.belongsTo(models.Estabelecimento, {
      foreignKey: 'estabelecimentoId', // Usa o nome do atributo do modelo Produto
      as: 'Estabelecimento'
    });
    Produto.belongsTo(models.tipoProduto, {
      foreignKey: 'tipoProdutoId',     // Usa o nome do atributo do modelo Produto
      as: 'tipoProduto'
    });
    Produto.belongsTo(models.estadoProduto, {
      foreignKey: 'estadoProdutoidEstadoProduto', // Usa o nome do atributo do modelo Produto
      as: 'estadoProduto'
    });
  };

  return Produto;
};