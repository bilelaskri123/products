const express = require('express');
const router = express.Router();
const priceController = require('../controllers/price.controller');
router.post('/', priceController.addPrice);
router.get('/:productId', priceController.getPrices);
// get all prices ==> second steps

module.exports = router;
