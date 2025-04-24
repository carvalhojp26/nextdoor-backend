const userService = require("../services/userService");
const bcrypt = require("bcrypt");

const listUsers = async (req, res) => {
  try {
    const result = await userService.getUsers();
    res.status(200).json({ message: "Users fetched successfully", user: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

  //const addUser = async (req, res) => {
  //  try {
  //    const result = await userService.insertUser(req.body);
  //    res.status(201).json({ message: "User added successfully", user: result  });
  //  } catch (error) {
  //    res.status(500).json({ error: "Internal server error" });
  //  }
  //};

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

const editUser = async (req, res) => {
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

module.exports = { listUsers, editUser, deleteUserController, registerUserController };
