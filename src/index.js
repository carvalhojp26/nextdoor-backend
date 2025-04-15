const express = require("express");
const { poolConnect } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        await poolConnect
        res.send("Connection with database successful");
    } catch (error) {
        console.error("Error connecting to database: ", error);
        res.status(500).send("Error connecting to database");
    }
});

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
});