const express = require('express');
const router = express.Router();
const localController = require('../controllers/local.controller');

router.get('/', localController.getLocals);

module.exports = router;
