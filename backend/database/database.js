const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("calendariwow_db", "root", "PUC@1234", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;