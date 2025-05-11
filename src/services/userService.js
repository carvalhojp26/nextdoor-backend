const {
  Utilizador,
  Endereco,
  Vizinhanca,
  estadoUtilizador,
  tipoUtilizador,
} = require("../models/association/associations");

//Admin
const getAllUsers = async () => {
  try {
    const users = await Utilizador.findAll({
      include: [
        { model: Endereco },
        { model: Vizinhanca },
        { model: estadoUtilizador },
        { model: tipoUtilizador },
      ],
    });
    return users;
  } catch (error) {
    console.error("Error getting users in database:", error);
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const user = await Utilizador.findOne({ // Mudado de 'users' para 'user' para clareza
      where: { idUtilizador: userId },
      include: [
        { model: Endereco, as: 'Endereco' }, // Use o alias correto se houver
        { model: Vizinhanca, as: 'Vizinhanca' }, // << IMPORTANTE! Use o alias correto se houver. Se não houver 'as', será 'Vizinhanca'
        { model: estadoUtilizador, as: 'estadoUtilizador' }, // Use o alias correto
        { model: tipoUtilizador, as: 'tipoUtilizador' }  // Use o alias correto
      ],
      // attributes: [...] // Se quiser limitar os campos do Utilizador
    });
    return user; // Retorna o objeto do usuário ou null
  } catch (error) {
    console.error("Error getting user by ID in database:", error); // Mensagem mais específica
    throw error;
  }
};

const getUserById = async (userId, neighborhoodId) => {
  try {
    const user = await Utilizador.findOne({
      where: { idUtilizador: userId, VizinhançaidVizinhança: neighborhoodId },
      include: [
        { model: Endereco },
        { model: Vizinhanca },
        { model: estadoUtilizador },
        { model: tipoUtilizador },
      ],
    });

    return user;
  } catch (error) {
    console.error("Error getting user by ID from database:", error);
    throw error;
  }
};

const getUsersByNeighborhood = async (neighborhoodId) => {
  try {
    const user = await Utilizador.findAll({
      where: { VizinhançaidVizinhança: neighborhoodId },
      include: [
        { model: Endereco },
        { model: Vizinhanca },
        { model: estadoUtilizador },
        { model: tipoUtilizador },
      ],
    });

    return user;
  } catch (error) {
    console.error("Error getting user by neighborhood from database:", error);
    throw error;
  }
};

const registerUser = async (body) => {
  try {
    const user = await Utilizador.create(body);
    return user;
  } catch (error) {
    console.error("Error adding user in database: ", error);
    throw error;
  }
};

const updateUser = async (userId, body) => {
  try {
    const [updatedRows] = await Utilizador.update(body, {
      where: { idUtilizador: userId },
    });
    return updatedRows;
  } catch (error) {
    console.error("Error updating user in database:", error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const deleted = await Utilizador.destroy({
      where: { idUtilizador: userId },
    });
    return deleted;
  } catch (error) {
    console.error("Error deleting user in database:", error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUser,
  getUserById,
  getUsersByNeighborhood,
  registerUser,
  updateUser,
  deleteUser,
};
