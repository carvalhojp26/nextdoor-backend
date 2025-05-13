const {
  Estabelecimento,
  Endereco,
  Vizinhanca,
} = require("../models/association/associations");

const getEstablishmentsByNeighborhood = async (neighborhoodId) => {
  try {
    const establishments = await Estabelecimento.findAll({
      where: { VizinhancaidVizinhanca: neighborhoodId },
      include: [{ model: Endereco }, { model: Vizinhanca }],
    });
    return establishments;
  } catch (error) {
    console.error("Error getting establishments in database:", error);
    throw error;
  }
};

const getEstablishments = async (neighborhoodId) => {
  try {
    const establishments = await Estabelecimento.findAll({
      where: { VizinhancaidVizinhanca: neighborhoodId },
      include: [{ model: Endereco }, { model: Vizinhanca }],
    });
    return establishments;
  } catch (error) {
    console.error("Error getting establishments in database:", error);
    throw error;
  }
};

const getEstablishmentById = async (establishmentId, neighborhoodId) => {
  try {
    const establishments = await Estabelecimento.findAll({
      where: {
        idEstabelecimento: establishmentId,
        VizinhancaidVizinhanca: neighborhoodId,
      },
      include: [{ model: Endereco }, { model: Vizinhanca }],
    });
    return establishments;
  } catch (error) {
    console.error("Error getting establishments in database:", error);
    throw error;
  }
};

const createEstablishment = async (body) => {
  try {
    const establishment = await Estabelecimento.create(body);
    return establishment;
  } catch (error) {
    console.error("Error adding establishment in database:", error);
    throw error;
  }
};

const updateEstablishment = async (establishmentId, body) => {
  try {
    const [updatedRows] = await Estabelecimento.update(body, {
      where: { idEstabelecimento: establishmentId },
    });
    return updatedRows;
  } catch (error) {
    console.error("Error updating establishment in database:", error);
    throw error;
  }
};

const deleteEstablishment = async (establishmentId) => {
  try {
    const deleted = await Estabelecimento.destroy({
      where: { idEstabelecimento: establishmentId },
    });
    return deleted;
  } catch (error) {
    console.error("Error deleting establishment in database:", error);
    throw error;
  }
};

const getAllEstablishments = async () => {
  try {
    const establishments = await Estabelecimento.findAll({
      include: [ // É importante incluir os dados de Endereço e Vizinhanca para exibição no frontend
        {
          model: Endereco,
          as: 'Endereco', // Certifique-se que este alias corresponde ao definido no seu modelo Estabelecimento
        },
        {
          model: Vizinhanca,
          as: 'Vizinhanca', // Certifique-se que este alias corresponde
        },
      ],
      // Você pode adicionar uma ordenação se desejar, ex: order: [['nomeEstabelecimento', 'ASC']]
    });
    return establishments;
  } catch (error) {
    console.error("Erro ao buscar todos os estabelecimentos no serviço (getAllEstablishments):", error);
    throw error;
  }
};

module.exports = {
  getEstablishmentsByNeighborhood,
  getEstablishments,
  getEstablishmentById,
  createEstablishment,
  updateEstablishment,
  deleteEstablishment,
  getAllEstablishments,
};
