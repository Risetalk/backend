require("dotenv").config();
const { Sequelize } = require("sequelize");

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGDIALECT, DEBUG, PGPORT } = process.env;



// DEBUG = true
// PGDATABASE = riseTalk
// PGHOST = localhost
// PGPASSWORD = admin
// PGPORT = 5432
// PGUSER = postgres
// PGDIALECT = postgres


if (DEBUG === "true") {

  const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: PGDIALECT,
    port: PGPORT,
    logging: false,
  });

  module.exports = sequelize;

} else {

  const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: PGDIALECT,
    port: PGPORT,
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

