const db = require("../config/db");
const Utilizador = db.Utilizador;

const getUsers = async () => {
  try {
    const users = await db.Utilizador.findAll({
      include: [
        { model: db.Endereco },
        { model: db.Vizinhanca },
        { model: db.estadoUtilizador },
        { model: db.tipoUtilizador },
      ],
    });
    //
    return users;
  } catch (error) {
    console.error("Erro ao buscar utilizadores:", error);
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
