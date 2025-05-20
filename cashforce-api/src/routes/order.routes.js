const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.get('/orders', OrderController.findAll);

module.exports = router;
