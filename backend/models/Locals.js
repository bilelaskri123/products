const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class Local extends Model { }
Local.init({
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
  modelName: 'Locals',
  timestamps: false,
})


module.exports = Local;
