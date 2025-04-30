const userService = require("../services/userService");
const getAllEstablishmentsController = async (req, res) => {
  try {
    const result = await establishmentService.getAllEstablishments();
    res.status(200).json({ message: "Establishments fetched successfully", establishments: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEstablishmentsController = async (req, res) => {
  const userId = req.user.idUtilizador
  try {
    const allUsers = await userService.getAllUsers();
    const user = find((u) => u.idUtilizador === userId);
    const userAddress = user.EnderecoidEndereco;
    const result = await establishmentService.getEstablishments(userAddress);
    res.status(200).json({ message: "Establishments fetched successfully", establishments: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {getAllEstablishmentsController, getEstablishmentsController}