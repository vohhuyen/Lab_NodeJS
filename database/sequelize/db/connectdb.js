const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('express', 'root', null, {
    host: 'localhost',
    port: 3306,
    name: 'nodejs',
    dialect: 'mysql'
  });


  module.exports = sequelize;