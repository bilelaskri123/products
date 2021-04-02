const Product = require('../models/Product');
const Price = require('../models/Price');
const sequelize = require('../util/database');
const { QueryTypes } = require('sequelize');

exports.addProduct = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.body);
  let product = new Product({
    productName: req.body.productName,
    local: req.body.local,
    imageUrl:  url + "/images/" + req.file.filename,
  })

  product.save().then(product => {
    console.log(product);
    res.status(201).json({
      message: 'product created with success'
    })
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'server error'
    })
  })
}

exports.getProducts = async (req, res, next) => {
  console.log(req.query);
  const filterInput = '%' + req.query.filterInput + '%';
  const langue = req.query.langue;
  const filterSelect = '%' + req.query.filterSelect + '%';
  const local = '%' + req.query.local + '%';
  const category = '%' + req.query.category + '%';
  const products = await sequelize.query(
    'SELECT Prices.id, Prices.ProductId, Products.productName, Products.category, Products.langue, Products.local, Prices.date, Products.imageUrl, mediumPrice, unity ' +
    'FROM Prices ' +
    'LEFT OUTER JOIN Products  ON Prices.ProductId = Products.id ' +
    'where productName LIKE :filterInput AND langue = :langue AND local like :local AND category like :category '+
    'ORDER BY date DESC',
    {model: Price, type: QueryTypes.SELECT, replacements: {filterInput: filterInput, langue: langue, local: local, category: category}});
  let i=0;
  while(i<products.length) {
    let j=i+1;
    while (j<products.length) {
      if (products[j].ProductId == products[i].ProductId) {
        products.splice(j, 1);
      } else {
        j++;
      }
    }
    i++;
  }

  if (products) {
    res.status(200).json({
      products: products
    })
  } else {
    res.status(500).json({
      message: 'server error'
    })
  }
  /*Product.findAll({}).then(products => {
    res.status(200).json({products: products});
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'server error',
    })
  })*/
}

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOne({where: {id: productId}}).then(product => {
    res.status(200).json(product)
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'server error'
    })
  })
}

exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId);
  Product.update({}, {where: {id: productId}}).then(product => {
    res.status(200).json(product)
  }).catch(error => {
    console.log((error));
    res.status(500).json({
      message: 'server error'
    })
  })
}

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.destroy({where: {id: productId}}).then(product => {
    console.log(product);
    res.status(200).json({
      message: 'product deleted with success'
    })
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'server error'
    })
  })
}
