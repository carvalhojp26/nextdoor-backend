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
        { model: Vizinhanca },  //Estamos a pedir ao sequilize para fazer inners joins no sql e retornar os dados
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

const insertUser = async (body) => {
  try {
    const user = await Utilizador.create(body);
    return user;
  } catch (error) {
    console.error("Error adding user in database:", error);
    throw error;
  }
};

const updateUser = async (userId, body) => {
  try {
    const [updatedRows] = await Utilizador.update(body, {
      where: { idUtilizador: userId },
    });

    if (updatedRows === 0) {
      throw new Error(`User with Id ${userId} not found.`);
    }

    const updatedUser = await Utilizador.findOne({
      where: { idUtilizador: userId },
      include: [
        { model: Endereco },
        { model: Vizinhanca },
        { model: estadoUtilizador },
        { model: tipoUtilizador },
      ],
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user in database:", error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const deleted = await Utilizador.destroy({ where: { idUtilizador: userId } });
    return deleted;
  } catch (error) {
    console.error("Error deleting user in database:", error);
    throw error;
  }
};

module.exports = { getUsers, insertUser, deleteUser, updateUser };
