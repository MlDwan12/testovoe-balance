// routes/balanceRoutes.js
const express = require("express");
const { updateBalanceHandler } = require("../controllers/balance.controller");

const router = express.Router();

router.put("/update-balance", updateBalanceHandler);

module.exports = router;
