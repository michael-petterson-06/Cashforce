const { findAllOrders } = require('../services/OrderService');

module.exports = {
  async findAll(req, res) {
    try {
      const formatted = await findAllOrders();
      return res.status(200).json(formatted);
    } catch (err) {
      console.log('[OrderController] Erro ao buscar pedidos:', err?.message || err);
      return res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  }
};
