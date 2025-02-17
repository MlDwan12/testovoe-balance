// services/balanceService.js
const { User } = require("../../../../models/user");

const updateBalance = async (userId, amount, transaction) => {
  const user = await User.findByPk(userId, {
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  if (user.balance + amount < 0) {
    throw new Error("Некорректный баланс");
  }

  user.balance += amount;
  await user.save({ transaction });
  return user.balance;
};

module.exports = { updateBalance };
