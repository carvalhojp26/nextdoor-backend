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
  const userId = req.user.idUtilizador;
  try {
    const user = await userService.getUser(userId);
    const neighborhoodId = user.VizinhançaidVizinhança;
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

module.exports = {
  getEstablishmentsByNeighborhoodController,
  getEstablishmentsController,
  getEstablishmentByIdController,
  createEstablishmentController,
  updateEstablishmentController,
  deleteEstablishmentController,
};
