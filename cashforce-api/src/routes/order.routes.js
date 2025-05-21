const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 */
router.get('/orders', OrderController.findAll);

module.exports = router;
