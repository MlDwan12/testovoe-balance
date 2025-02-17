const { updateBalance } = require("../services/balance.service");

const updateBalanceHandler = async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || typeof amount !== "number") {
    return res
      .status(400)
      .json({ error: "Проверьте правильность передаваемых данных" });
  }

  const transaction = await req.app.locals.sequelize.transaction();

  try {
    const balance = await updateBalance(userId, amount, transaction);

    await transaction.commit();
    return res.json({ balance });
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating balance:", error);
    return res
      .status(400)
      .json({ error: error.message || "Internal server error" });
  }
};

module.exports = { updateBalanceHandler };
