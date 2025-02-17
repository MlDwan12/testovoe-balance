const { updateBalance } = require("../services/balance.service");
const { body, validationResult } = require("express-validator");

const validateUpdateBalance = [
  body("userId").isInt().withMessage("userId должен быть целым числом"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("amount должен быть числом больше нуля"),
];

const updateBalanceHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, amount } = req.body;

  const transaction = await req.app.locals.sequelize.transaction();

  try {
    const balance = await updateBalance(userId, amount, transaction);

    await transaction.commit();
    return res.json({ balance });
  } catch (error) {
    await transaction.rollback();
    console.error("Ошибка обновления баланса:", error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { updateBalanceHandler, validateUpdateBalance };
