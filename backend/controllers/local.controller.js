const sequelize = require('../util/database');
const Local = require('../models/Locals');

exports.getLocals = (req, res, next) => {
  const langue = req.query.langue;
  console.log(langue);
  Local.findAll({where: {langue: langue}}).then(locals => {
    res.status(200).json({
      locals: locals
    })
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'server error'
    })
  })
}
