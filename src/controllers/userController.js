const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Admin
const getAllUsersController = async (req, res) => {
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    const result = await userService.getAllUsers();
    res
      .status(200)
      .json({ message: "Users fetched successfully", user: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserController = async (req, res) => {
  const userId = req.user.idUtilizador;
  try {
    const result = await userService.getUser(userId);
    res
      .status(200)
      .json({ message: "User fetched successfully", user: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsersByNeighborhoodController = async (req, res) => {
  const userId = req.user.idUtilizador;
  try {
    const allUsers = await userService.getAllUsers();
    const findUser = allUsers.find((u) => u.idUtilizador === userId);
    const neighborhoodId = findUser.VizinhançaidVizinhança;

    const user = await userService.getUsersByNeighborhood(neighborhoodId);
    res.status(200).json({ message: "User fetched successfully", user: user });
  } catch (error) {
    res.status(500).json({ error: "User not found" });
  }
};

const getUserByIdController = async (req, res) => {
  const { userId } = req.params;
  const userEmail = req.user.emailUtilizador;
  try {
    
    const allUsers = await userService.getAllUsers();
    const findUser = allUsers.find((u) => u.emailUtilizador === userEmail);
    const neighborhoodId = findUser.VizinhançaidVizinhança;
    const user = await userService.getUserById(userId, neighborhoodId);

    res.status(200).json({ message: "User fetched successfully", user: user });
  } catch (error) {
    res.status(500).json({ error: "User not found" });
  }
};

const registerUserController = async (req, res) => {
  const { password, nomeUtilizador,pontosUtilizador, dataNascimento, comprovativoResidencia, emailUtilizador, VizinhançaidVizinhança, EnderecoidEndereco, estadoUtilizadoridEstadoUtilizador, tipoUtilizadoridTipoUtilizador } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  if (
    !password ||
    !nomeUtilizador ||
    !dataNascimento ||
    !comprovativoResidencia ||
    !emailUtilizador ||
    !VizinhançaidVizinhança ||
    !EnderecoidEndereco ||
    !estadoUtilizadoridEstadoUtilizador ||
    !tipoUtilizadoridTipoUtilizador ||
    !pontosUtilizador
  ) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const result = await userService.registerUser({
      password: hashedPassword,
      nomeUtilizador,
      dataNascimento,
      pontosUtilizador,
      comprovativoResidencia,
      emailUtilizador,
      VizinhançaidVizinhança,
      EnderecoidEndereco,
      estadoUtilizadoridEstadoUtilizador,
      tipoUtilizadoridTipoUtilizador
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: result });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUserController = async (req, res) => {
  const { emailUtilizador, password } = req.body;
  try {
    const allUsers = await userService.getAllUsers();
    const user = allUsers.find((u) => u.emailUtilizador === emailUtilizador);

    if (!user) {
      return res.status(401).json({ error: "Invalid Email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Wrong Password" });
    }

    const token = jwt.sign(
      {
        idUtilizador: user.idUtilizador,
        emailUtilizador: user.emailUtilizador,
        idTipoUtilizador: user.tipoUtilizadoridTipoUtilizador,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Logged in successfully",
      token: token,
      user: {
        id: user.idUtilizador,
        nome: user.nomeUtilizador,
        email: user.emailUtilizador,
        tipoUtilizador: user.tipoUtilizadoridTipoUtilizador,
      },
    });
  } catch (error) {
    console.error("Error logging in: ", user);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.user.idUtilizador;
    const result = await userService.updateUser(userId, req.body);
    res
      .status(200)
      .json({ message: "User updated successfully", user: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUserController = async (req, res) => {
  const { userId } = req.params;
  const tipoUtilizador = req.user.idTipoUtilizador;
  try {
    if (tipoUtilizador !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const result = await userService.deleteUser(userId);
    res
      .status(200)
      .json({ message: "User deleted successfully", user: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUsersController,
  getUserController,
  getUserByIdController,
  getUsersByNeighborhoodController,
  registerUserController,
  loginUserController,
  updateUserController,
  deleteUserController,
};
