const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("library", "root", "", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
});

module.exports = sequelize;
