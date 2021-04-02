const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class Category extends Model { }
Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  langue: {type: DataTypes.ENUM, values: ['fr', 'ar'] },
}, {
  sequelize,
  modelName: 'Categories',
  timestamps: false
})


module.exports = Category;
