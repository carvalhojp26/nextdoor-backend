const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();
const db = require("./models/associations");

const userRoutes = require("./routes/userRoutes");
const tasksRoutes = require("./routes/taskRoutes");
const addressRoutes = require("./routes/addressRoutes");
const productRoutes = require("./routes/productRoutes");
const neighborhoodRoutes = require("./routes/neighborhoodRoutes");
const redemptionCodeRoutes = require("./routes/redemptionCodeRoutes");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/neighborhoods", neighborhoodRoutes)
app.use("/api/products", productRoutes);
app.use("/api/redemptionCodes", redemptionCodeRoutes)

try {
  db.sequelize.authenticate();
  console.log("Database connection successfully established.");
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to database:", error);
}
