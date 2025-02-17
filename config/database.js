// database.js
const { Sequelize } = require("sequelize");
const config = require("./config.json")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  //   config.database,
  //   config.username,
  //   config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: 5433,
    logging: false,
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Подключение к БД установлено.");

    const { exec } = require("child_process");
    exec("yarn sequelize-cli db:migrate", (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка миграции: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    await sequelize.sync(); // Синхронизация таблиц
    console.log("Все таблицы синхронизированы.");
  } catch (error) {
    console.error("Ошибка подключения к БД:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectToDatabase };
