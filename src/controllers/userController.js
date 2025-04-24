  const userService = require("../services/userService");

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

  const createUserController = async (req, res) => {
    try {
      const result = await userService.createUser(req.body);
      res.status(201).json({ message: "User added successfully", user: result  });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

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
      res.status(200).json({message: "User deleted successfully", user: result});
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  module.exports = { getUserByIdController, getUserController, getUserByNeighborhoodController, createUserController, updateUserController, deleteUserController };
