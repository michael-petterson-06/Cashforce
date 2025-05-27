const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.get('/orders', OrderController.findAll);
router.get('/orders/:id', OrderController.findOne);

module.exports = router;
