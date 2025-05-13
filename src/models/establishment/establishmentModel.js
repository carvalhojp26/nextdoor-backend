// models/estabelecimentoModel.js
module.exports = (sequelize, DataTypes) => {
  const Estabelecimento = sequelize.define(
    "Estabelecimento",
    {
      idEstabelecimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      telefoneEstabelecimento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailEstabelecimento: {
        type: DataTypes.STRING,
      },
      nomeEstabelecimento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // ----- ADICIONAR A FK PARA VIZINHANCA -----
      VizinhancaidVizinhanca: { // Ou o nome exato que tens na tua tabela BD Estabelecimento
        type: DataTypes.INTEGER,
        allowNull: false, // Assumindo que um estabelecimento TEM que pertencer a uma vizinhança
        references: {
          model: 'Vizinhanca', // Nome da tabela Vizinhanca
          key: 'idVizinhanca'
        }
      },
      // ----- ADICIONAR A FK PARA ENDERECO (se já não estiver noutro sítio) -----
      // Pela tua descrição da tabela, parecia que tinhas EnderecoidEndereco aqui também.
      // Se o EnderecoidEndereco está aqui, adiciona-o:
      EnderecoidEndereco: { // Ou o nome exato da tua coluna FK
        type: DataTypes.INTEGER,
        allowNull: true, // Ou false, dependendo da obrigatoriedade
        references: {
          model: 'Endereco', // Nome da tabela Endereco
          key: 'idEndereco'
        }
      }
    },
    {
      tableName: "Estabelecimento",
      timestamps: false,
    }
  );

  return Estabelecimento;
};