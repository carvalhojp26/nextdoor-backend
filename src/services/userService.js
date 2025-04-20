const {
  Utilizador,
  Endereco,
  Vizinhanca,
  estadoUtilizador,
  tipoUtilizador,
} = require("../models/associations");

const getUsers = async () => {
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
    console.error("Error getting user in database:", error);
    throw error;
  }
};

const insertUser = async (body) => {
  try {
    const user = await Utilizador.create(body);
    return user;
  } catch (error) {
    console.error("Error adding user in database:", error);
    throw error;
  }
};

const deleteUser = async (idUtilizador) => {
  try {
    const deleted = await Utilizador.destroy({ where: { idUtilizador } });
    return deleted;
  } catch (error) {
    console.error("Error deleting user in database:", error);
    throw error;
  }
};

module.exports = { getUsers, insertUser, deleteUser };
