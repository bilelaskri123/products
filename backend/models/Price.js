const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class Price extends Model { }
Price.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  minPrice: {
    type: DataTypes.FLOAT
  },
  maxPrice: {
    type: DataTypes.FLOAT
  },
  mediumPrice: {
    type: DataTypes.FLOAT
  },
  date: {
    type: DataTypes.DATE
  },
  unity: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'Price'
})


module.exports = Price;
