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
  
  async function findAllOrders() {
    const result = await orders.findAll({
      include: [
        { model: buyers, as: 'buyer' },
        { model: providers, as: 'provider' },
        { model: users, as: 'user' },
        { model: cnpjs, as: 'cnpj' }
      ]
    });
  
    return result.map(order => {
      const obj = typeof order.toJSON === 'function' ? order.toJSON() : order;
      return {
        ...obj,
        statusDescription: statusList[Number(obj.orderStatusBuyer)]
      };
    });
  }

  async function findOrderById(id) {
    const order = await orders.findByPk(id, {
      include: [
        { model: providers, as: 'provider' },
        { model: buyers, as: 'buyer' },
        { model: users, as: 'user' },
        { model: cnpjs, as: 'cnpj' },
      ]
    });
    return order;
  }
  
  module.exports = { findAllOrders, findOrderById };
  