const sequelize = require('../util/database');
const Category = require('../models/Category');

exports.getLocals = (req, res, next) => {
  const langue = req.query.langue;
  console.log(langue);
  Category.findAll({where: {langue: langue}}).then(categories => {
    res.status(200).json({
      categories: categories
    })
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'server error'
    })
  })
}
