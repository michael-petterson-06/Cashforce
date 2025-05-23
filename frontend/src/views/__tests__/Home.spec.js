import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import Home from '../Home.vue';
import OrderRow from '@/components/OrderRow.vue';

vi.mock('@/services/orderService', () => ({
  getOrders: () => Promise.resolve([
    {
      id: 1,
      orderNfId: '123456',
      buyer: { name: 'SACADO 001' },
      provider: { name: 'CEDENTE 001' },
      emissionDate: '2024-05-10T03:00:00Z',
      value: '123456.78',
      statusDescription: 'Pedido confirmado'
    }
  ])
}));

describe('Home.vue', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(Home, {
      global: {
        stubs: ['router-link'],
      }
    });
    await flushPromises();
  });

  it('renderiza a lista de pedidos (OrderRow)', () => {
    const rows = wrapper.findAllComponents(OrderRow);
    expect(rows).toHaveLength(1);
    expect(wrapper.text()).toContain('SACADO 001');
    expect(wrapper.text()).toContain('CEDENTE 001');
    expect(wrapper.text()).toContain('10/05/2024'); 
    expect(wrapper.text()).toContain('R$ 123.456,78');
    expect(wrapper.text()).toContain('Pedido confirmado');
  });
});
