const { User } = require("../../../../models/user");

const updateBalance = async (userId, amount, transaction) => {
  const user = await User.findByPk(userId, { transaction });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  if (user.balance + amount < 0) {
    throw new Error("Недостаточно средств на балансе");
  }

  user.balance += amount;

  await user.save({ transaction });

  return user.balance;
};

module.exports = { updateBalance };
