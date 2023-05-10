require("dotenv").config();
const { Sequelize } = require("sequelize");

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGDIALECT, DEBUG, PGPORT } = process.env;

if (DEBUG === "true") {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "./database.sqlite",
        logging: false,
    });

    module.exports = sequelize;

} else {

    const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
        host: PGHOST,
        dialect: PGDIALECT,
        port: PGPORT,
        // ! Connecting with CloudDatabase
        // dialectOptions: {
        //   ssl: {
        //     rejectUnauthorized: false,
        //   },
        // },
        logging: false,
    });
    module.exports = sequelize;
}

