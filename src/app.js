const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();
const db = require("./models/associations");

const userRoutes = require("./routes/userRoutes");
const tasksCreationRoutes = require("./routes/taskCreationRoutes");
const addressRoutes = require("./routes/addressRoutes");
const productRoutes = require("./routes/productRoutes");
//const storeRoutes = require("./routes/storeRoutes");
//const tasksRoutes = require("./routes/taskRoutes");
//const rateRoutes = require("./routes/rateRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const neighborhoodRoutes = require("./routes/neighborhoodRoutes");
const redemptionCodeRoutes = require("./routes/redemptionCodeRoutes");
const taskRealization = require("./routes/taskRealizationRoutes");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/taskCreation", tasksCreationRoutes);
app.use("/api/addresses", addressRoutes);
//app.use("/api/rates", rateRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/neighborhoods", neighborhoodRoutes)
app.use("/api/products", productRoutes);
app.use("/api/redemptionCodes", redemptionCodeRoutes)
app.use("/api/taskRealization", taskRealization);

try {
  db.sequelize.authenticate();
  console.log("Database connection successfully established.");
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to database:", error);
}
