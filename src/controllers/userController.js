const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

  const getUserByIdController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    res.status(200).json({ message: "User fetched successfully", user: user });
  } catch (error) {
    res.status(500).json({ error: "User not found" });
  }
};

const getUserByNeighborhoodController = async (req, res) => {
  try {
    const { neighborhoodId } = req.params;
    const user = await userService.getUserByNeighborhood(neighborhoodId);
    res.status(200).json({ message: "User fetched successfully", user: user });
  } catch (error) {
    res.status(500).json({ error: "User not found" });
  }
};

  const getUserController = async (req, res) => {
    try {
      const result = await userService.getUser();
      res.status(200).json({ message: "Users fetched successfully", user: result  });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

const registerUserController = async (req, res) => {
	const { password, ...otherFields } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const userData = { ...otherFields, password: hashedPassword }
	console.log(userData)
	try {
		const result = await userService.registerUser(userData);
		res.status(201).json({ message: "User registered successfully", user: result });
	} catch (error) {
		console.error("Error registering user: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

const loginUserController = async (req, res) => {
	const { emailUtilizador, password } = req.body;

	try {
		const allUsers = await userService.getUser();
		const user = allUsers.find(u => u.emailUtilizador === emailUtilizador);

		if (!user) {
			return res.status(401).json({ error: "Invalid Email" });
		};
		
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(401).json({ error: "Wrong Password" });
		}

		const token = jwt.sign(
      // 1. Payload: Os dados que vão dentro do token, o token não é encriptado nem codificado, colocar informação não sensivel pois podem roubar indormação do token
			{ idUtilizador: user.idUtilizador, emailUtilizador: user.emailUtilizador },
      //Chave Secreta: Usada para "assinar" o token
			process.env.SECRET_KEY,
			{ expiresIn: '1h' }
		)

		res.status(200).json({
			message: "Logged in successfully",
			token: token,
			user: {
				id: user.idUtilizador,
				nome: user.nomeUtilizador,
				email: user.emailUtilizador
			}
		})

	} catch (error) {
		console.error("Error logging in: ", user);
		res.status(500).json({ error: "Internal server error" });
	}
}

  const updateUserController = async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await userService.updateUser(userId, req.body);
      res.status(200).json({ message: "User updated successfully", user: result });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

const deleteUserController = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await userService.deleteUser(userId);
    res.status(200).json({message: "User deleted successfully", user: result,});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

  module.exports = { getUserByIdController, getUserByNeighborhoodController, getUserController, registerUserController, loginUserController, updateUserController, deleteUserController };
