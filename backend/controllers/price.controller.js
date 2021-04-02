const Price = require('../models/Price');
const Product = require('../models/Product');
const moment = require('moment');
const sequelize = require('../util/database');
const { QueryTypes } = require('sequelize');

exports.addPrice = (req, res, next) => {
    console.log(req.body);
    const price = new Price({
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice,
      mediumPrice: req.body.mediumPrice,
      date: moment(req.body.date, "YYYYMMDD"),
      unity: req.body.unity,
      ProductId: req.body.ProductId
    })

  price.save().then(response => {
    res.status(200).json({
      message: 'price added'
    })
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'server error'
    })
  })
}

const prices = sequelize.query(
  'SELECT `Price`.`id`, `Price`.`minPrice`, `Price`.`maxPrice`, `Price`.`mediumPrice`, `Price`.`date`, `Price`.`unity`, `Price`.`ProductId`, `Product`.`id` AS `Product.id`, `Product`.`productName` AS `Product.productName`, `Product`.`local` AS `Product.local`, `Product`.`imageUrl` AS `Product.imageUrl`, ' +
  ' FROM `Prices` AS `Price` ' +
  'LEFT OUTER JOIN `Products` AS `Product` ON `Price`.`ProductId` = `Product`.`id` ' +
  'ORDER BY `Price`.`date` DESC',
  {model: Price, type: QueryTypes.SELECT});

// get all prices where her productId == productId and show her chart ==> first step
exports.getPrices = async (req, res, next) => {
  const productId = req.params.productId;
  const prices = await sequelize.query(
    'SELECT * ' +
    'FROM Prices ' +
    'LEFT OUTER JOIN Products  ON Prices.ProductId = Products.id WHERE Prices.ProductId = :productId ' +
    'ORDER BY date',
    {model: Price, type: QueryTypes.SELECT, replacements: {productId: productId}});

  if (prices) {
    res.status(200).json({
      prices: prices
    })
  } else {
    res.status(500).json({
      message: 'server error'
    })
  }
}
