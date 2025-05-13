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
    const users = await Utilizador.findOne({
      where: { idUtilizador: userId },
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

const fetchUserByIdInternal = async (userId) => { // Nome diferente para evitar conflito se já tiver getUserById
  try {
    console.log(`SERVICE userService (fetchUserByIdInternal): Buscando utilizador com ID: ${userId}`);
    const user = await Utilizador.findByPk(userId, {
      // Não precisamos de include de Vizinhanca aqui se VizinhançaidVizinhança já está no modelo Utilizador
      // Mas se quisermos o objeto Vizinhanca completo:
      include: [
         { model: Vizinhanca, as: 'Vizinhanca' }, // Assegura que o alias 'Vizinhanca' está definido na associação Utilizador-Vizinhanca
         { model: Endereco, as: 'Endereco' }, // Se necessário para outros contextos
         { model: estadoUtilizador, as: 'estadoUtilizador'}, // Se necessário
         { model: tipoUtilizador, as: 'tipoUtilizador'} // Se necessário
      ]
    });
    if (!user) {
        console.warn(`SERVICE userService (fetchUserByIdInternal): Utilizador com ID ${userId} não encontrado na BD.`);
    } else {
        console.log(`SERVICE userService (fetchUserByIdInternal): Utilizador encontrado: ${JSON.stringify(user.get({plain: true}), null, 2)}`);
    }
    return user;
  } catch (error) {
    console.error(`SERVICE ERROR: fetchUserByIdInternal (${userId}) -`, error.message, error.stack);
    throw error;
  }
};

// A TUA FUNÇÃO ORIGINAL (se ainda for necessária para outros casos de uso)
const getUserByIdAndNeighborhoodFilter = async (userId, neighborhoodId) => {
  try {
    console.log(`SERVICE userService (getUserByIdAndNeighborhoodFilter): Buscando user ${userId} na vizinhança ${neighborhoodId}`);
    const user = await Utilizador.findOne({
      where: { idUtilizador: userId, VizinhançaidVizinhança: neighborhoodId },
      include: [
        { model: Endereco, as: 'Endereco' },
        { model: Vizinhanca, as: 'Vizinhanca' }, // Para confirmar que o where funcionou
        { model: estadoUtilizador, as: 'estadoUtilizador' },
        { model: tipoUtilizador, as: 'tipoUtilizador' },
      ],
    });
    return user;
  } catch (error) {
    console.error("SERVICE ERROR: getUserByIdAndNeighborhoodFilter -", error);
    throw error;
  }
};


// Função que o userController.getUserProfileController usa (pode ser fetchUserByIdInternal)
const getUserProfileData = async (userId) => {
    return fetchUserByIdInternal(userId); // Reutiliza
};

const updateUserDetails = async (userId, updateData, transaction = null) => {
  try {
    const options = {
      where: { idUtilizador: userId },
    };
    if (transaction) {
      options.transaction = transaction;
    }
    const [updatedRows] = await Utilizador.update(updateData, options);
     if (updatedRows === 0) {
        // console.warn(`User with ID ${userId} not found or no changes made.`);
    }
    return updatedRows;
  } catch (error) {
    console.error(`SERVICE_ERROR: updateUserDetails (userId: ${userId}) -`, error);
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
  fetchUserByIdInternal,
  getUserByIdAndNeighborhoodFilter,
  getUserProfileData,
  updateUserDetails,
};
