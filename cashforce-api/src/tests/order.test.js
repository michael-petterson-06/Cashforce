const request = require('supertest');
const app = require('../server');
const db = require('../models');

jest.mock('../models');

describe('GET /orders', () => {
  it('deve retornar a lista de pedidos com status 200', async () => {
    const mockOrder = {
      id: 1,
      orderStatusBuyer: 0
    };

     db.orders.findAll.mockResolvedValue([
      {
        toJSON: () => ({ ...mockOrder })
      }
    ]);

    const res = await request(app).get('/orders');

     expect(res.status).toBe(200);
    expect(res.body[0]).toMatchObject({
      id: 1,
      orderStatusBuyer: 0,
      statusDescription: 'Pendente de confirmação'
    });
  });

  it('deve retornar erro 500 se findAll falhar', async () => {
    db.orders.findAll.mockRejectedValue(new Error('Falha interna'));

    const res = await request(app).get('/orders');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro ao buscar pedidos' });
  });
});
