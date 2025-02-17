require("dotenv").config();
const express = require("express");
const balanceRoutes = require("./modules/balance/routes/balance.routes");
const { connectToDatabase } = require("../config/database");

const app = express();
app.use(express.json());
app.use("/api", balanceRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectToDatabase();

  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
};

startServer();
