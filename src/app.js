const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', //Isto permite que apenas requisições vindas do frontend que corre em localhost:5173
  credentials: true //permite que a requisição envie cookies, headers de autenticação, tokens ou sessões, uu seja, permite enviar/receber cookies entre o frontend e backend, bom para a autenticação
}));


require("dotenv").config();
const db = require("./models/association/associations");

const userRoutes = require("./routes/userRoutes");
const tasksCreationRoutes = require("./routes/taskCreationRoutes");
const addressRoutes = require("./routes/addressRoutes");
const productRoutes = require("./routes/productRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const neighborhoodRoutes = require("./routes/neighborhoodRoutes");
const redemptionCodeRoutes = require("./routes/redemptionCodeRoutes");
const taskRealizationRoutes = require("./routes/taskRealizationRoutes");
const establishmentRoutes = require("./routes/establishmentRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

app.use(express.json());

app.use('/uploads', express.static('src/uploads'));
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/taskCreations", tasksCreationRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/neighborhoods", neighborhoodRoutes)
app.use("/api/redemptionCodes", redemptionCodeRoutes);
app.use("/api/taskRealizations", taskRealizationRoutes);
app.use("/api/establishments", establishmentRoutes);
app.use("/api/feedbacks", feedbackRoutes);

try {
  db.sequelize.authenticate();
  console.log("Database connection successfully established.");
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to database:", error);
}
