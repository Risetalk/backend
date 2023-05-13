// Third Party Dependencies.
require("dotenv").config();
const { Sequelize } = require("sequelize");

// Environment Variables.
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT, DEBUG_MODE , DB_PORT } =
  process.env;

// Conditional for Debug Modes.
if (DEBUG_MODE === "true") {

  // Database Local Connection.
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
    logging: false,
  });

  module.exports = sequelize;
} else {

  // Database Cloud Connection
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
    // ! Connecting with CloudDatabase
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
  module.exports = sequelize;
}
