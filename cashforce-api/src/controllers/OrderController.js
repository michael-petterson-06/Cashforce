const { findAllOrders, findOrderById } = require('../services/OrderService');

module.exports = {
  async findAll(req, res) {
    try {
      const formatted = await findAllOrders();
      return res.status(200).json(formatted);
    } catch (err) {
      console.log('[OrderController] Erro ao buscar pedidos:', err?.message || err);
      return res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const order = await findOrderById(id);

      if (!order) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.log('[OrderController] Erro ao buscar pedido:', error?.message || error);
      return res.status(500).json({ message: 'Erro ao buscar pedido' });
    }
  }
};
