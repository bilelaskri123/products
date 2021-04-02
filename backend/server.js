const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images/')))

const sequelize = require('./util/database');
const Product = require('./models/Product');
const Price = require('./models/Price');
const Local = require('./models/Locals');
const Category = require('./models/Category');

Product.hasMany(Price);
Price.belongsTo(Product);

//Local.sync();
//Category.sync({alter: true});

Product.sync({alter: true});
//sequelize.sync({force: true});

const productRoutes = require('./routes/product.routes');
const priceRoutes = require('./routes/price.routes');
const localRoutes = require('./routes/local.routes');
const categoryRoutes = require('./routes/category.routes');

app.use('/products', productRoutes);
app.use('/price', priceRoutes);
app.use('/locals', localRoutes);
app.use('/categories', categoryRoutes);
app.listen(3000, (req, res, next) => {
  console.log('server connected at port 3000')
})
