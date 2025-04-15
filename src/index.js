const express = require("express");
const { poolPromise } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRoutes);

app.get('/', async (req, res) => {
    try {
        await poolPromise
        res.send("Connection with database successful");
    } catch (error) {
        console.error("Error connecting to database: ", error);
        res.status(500).send("Error connecting to database");
    }
});

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
});