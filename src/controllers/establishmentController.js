const establishmentService = require("../services/establishmentService");
const userService = require("../services/userService");

//admin
const getEstablishmentsByNeighborhoodController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  const { neighborhoodId } = req.params;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const establishments = await establishmentService.getEstablishments(
      neighborhoodId
    );

    res
      .status(200)
      .json({
        message: "Establishments fetched successfully",
        establishments: establishments,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEstablishmentsController = async (req, res) => {
  console.log("Entrando em getEstablishmentsController");
  if (!req.user || !req.user.idUtilizador) {
    console.error("Erro em getEstablishmentsController: req.user ou req.user.idUtilizador não definido.");
    return res.status(401).json({ error: "Utilizador não autenticado ou ID do utilizador em falta." });
  }

  const userId = req.user.idUtilizador;
  const userType = req.user.idTipoUtilizador; // Pega o tipo de utilizador do token

  console.log(`getEstablishmentsController - userId: ${userId}, userType: ${userType}`);

  try {
    let establishments;

    if (userType === 1) { // Assumindo que 1 é o idTipoUtilizador para Admin
      console.log("getEstablishmentsController - Utilizador é Admin. Buscando todos os estabelecimentos.");
      // Chama uma função de serviço para buscar TODOS os estabelecimentos
      // Você precisará criar esta função no seu establishmentService.js
      establishments = await establishmentService.getAllEstablishments(); // Nova função de serviço
    } else {
      // Lógica para utilizadores não-admin (vizinhos)
      console.log("getEstablishmentsController - Utilizador não é Admin. Buscando por vizinhança.");
      const user = await userService.getUser(userId);
      console.log("getEstablishmentsController - user buscado (não-admin):", user);

      if (!user) {
        console.error(`Erro em getEstablishmentsController: Utilizador (não-admin) com ID ${userId} não encontrado.`);
        return res.status(404).json({ error: "Utilizador não encontrado." });
      }

      const neighborhoodId = user.VizinhançaidVizinhança;
      console.log(`getEstablishmentsController - neighborhoodId (não-admin): ${neighborhoodId}`);

      if (neighborhoodId === undefined || neighborhoodId === null) {
        console.warn(`getEstablishmentsController: neighborhoodId (não-admin) é nulo ou indefinido para o utilizador ${userId}.`);
        // Para não-admins, se não houver vizinhança, provavelmente não há estabelecimentos para mostrar.
        return res.status(200).json({
            message: "Utilizador não associado a uma vizinhança ou vizinhança não encontrada.",
            establishments: [],
        });
      }
      // Usa a função de serviço existente que busca por vizinhança
      establishments = await establishmentService.getEstablishments(neighborhoodId);
    }

    console.log("getEstablishmentsController - estabelecimentos buscados:", establishments ? establishments.length : 0, "encontrados");

    res.status(200).json({
      message: "Establishments fetched successfully",
      establishments: establishments || [], // Garante que seja sempre um array
    });

  } catch (error) {
    console.error("Erro DETALHADO em getEstablishmentsController:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

const getEstablishmentByIdController = async (req, res) => {
  const { establishmentId } = req.params;
  const userId = req.user.idUtilizador;

  try {
    const user = await userService.getUser(userId);
    const neighborhoodId = user.VizinhançaidVizinhança;
    const establishment = await establishmentService.getEstablishmentById(
      establishmentId,
      neighborhoodId
    );

    res
      .status(200)
      .json({
        message: "Establishment fetched successfully",
        establishment: establishment,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createEstablishmentController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const {
      telefoneEstabelecimento,
      emailEstabelecimento,
      nomeEstabelecimento,
      EnderecoidEndereco,
      VizinhancaidVizinhanca,
    } = req.body;
    if (
      !telefoneEstabelecimento ||
      !emailEstabelecimento ||
      !nomeEstabelecimento ||
      !EnderecoidEndereco ||
      !VizinhancaidVizinhanca
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const result = await establishmentService.createEstablishment(req.body);
    res
      .status(200)
      .json({
        message: "Establishments fetched successfully",
        establishments: result,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateEstablishmentController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  const { establishmentId } = req.params;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const establishment = await establishmentService.updateEstablishment(
      establishmentId,
      req.body
    );
    res
      .status(200)
      .json({
        message: "Establishment updated successfully",
        updatedRows: establishment,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteEstablishmentController = async (req, res) => {
  const { establishmentId } = req.params;
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const result = await establishmentService.deleteEstablishment(
      establishmentId
    );
    res
      .status(200)
      .json({ message: "Establishment deleted successfully", user: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

 const getAllEstablishmentsAdminController = async (req, res) => {
  const userType = req.user.idTipoUtilizador; // Pega o tipo de usuário do token decodificado

  try {
    // Verifica se o usuário é um administrador (idTipoUtilizador === 1)
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Only administrators can perform this action." });
    }

    // Chama o serviço para buscar todos os estabelecimentos
    // Supondo que você tenha uma função no seu service como `getAllEstablishments`
    const establishments = await establishmentService.getAllEstablishments();

    if (!establishments || establishments.length === 0) {
      // Pode optar por retornar 200 com array vazio ou 404 se preferir que "nenhum encontrado" seja um erro
      return res.status(200).json({ establishments: [] }); // Frontend espera uma chave 'establishments'
    }

    // Retorna os estabelecimentos encontrados
    res.status(200).json({ establishments: establishments }); // Garanta que a resposta é um objeto com a chave 'establishments'

  } catch (error) {
    console.error("Error in getAllEstablishmentsAdminController:", error);
    // Evite expor detalhes do erro ao cliente em produção, mas logue no servidor
    res.status(500).json({ error: "Internal server error while fetching establishments." });
  }
};


module.exports = {
  getEstablishmentsByNeighborhoodController,
  getEstablishmentsController,
  getEstablishmentByIdController,
  createEstablishmentController,
  updateEstablishmentController,
  deleteEstablishmentController,
  getAllEstablishmentsAdminController,
};
