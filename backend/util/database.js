const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('product', 'root', 'root', {
  host: 'localhost',
  dialect:  'mysql'
});

module.exports = sequelize;
