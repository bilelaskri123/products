const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class Product extends Model { }
Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  productName: {
    type: DataTypes.STRING
  },
  local: {type: DataTypes.STRING},
  langue: {type: DataTypes.ENUM, values: ['fr', 'ar'] },
  category: {type: DataTypes.STRING},
  imageUrl: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Product'
})


module.exports = Product;
