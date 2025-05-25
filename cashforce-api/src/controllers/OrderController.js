const {
  orders,
  buyers,
  providers,
  users,
  cnpjs
} = require('../models');

const statusList = [
  'Pendente de confirmação', 'Pedido confirmado', 'Não reconhece o pedido',
  'Mercadoria não recebida', 'Recebida com avaria', 'Devolvida',
  'Recebida com devolução parcial', 'Recebida e confirmada', 'Pagamento Autorizado'
];

module.exports = {
  async findAll(req, res) {
    
    try {
      const result = await orders.findAll({
        include: [
          { model: buyers, as: 'buyer' },
          { model: providers, as: 'provider' },
          { model: users, as: 'user' },
          { model: cnpjs, as: 'cnpj' }
        ]
      });

      const formatted = result.map(order => {
        
        const obj = typeof order.toJSON === 'function' ? order.toJSON() : order;
        
        return {
          ...obj,
          statusDescription: statusList[Number(obj.orderStatusBuyer)]
        };
      });
      
      return res.json(formatted);
    } catch (err) {
      console.log('[OrderController] Erro ao buscar pedidos:', err?.message || err);
      return res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  }
};
