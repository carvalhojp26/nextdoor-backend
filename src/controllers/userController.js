const userService = require("../services/userService");

const listUsers = async (req, res) => {
    try {
        const result = await userService.getUsers();
        res.json(result);
    } catch (error) {
        console.error("Error fetching users in database: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const addUser = async (req, res) => {
    try {
        const result = await userService.insertUser(req.body)
        res.status(201).json({ message: "User added successfully", result });
    } catch (error) {
        console.error("Error adding user in database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { listUsers, addUser };