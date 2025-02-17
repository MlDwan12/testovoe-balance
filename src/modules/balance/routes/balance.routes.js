// routes/balanceRoutes.js
const express = require("express");
const {
  updateBalanceHandler,
  validateUpdateBalance,
} = require("../controllers/balance.controller");

const router = express.Router();

router.post("/update-balance", validateUpdateBalance, updateBalanceHandler);

module.exports = router;
