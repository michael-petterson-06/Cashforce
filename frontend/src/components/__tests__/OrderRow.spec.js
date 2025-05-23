import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import OrderRow from '../OrderRow.vue';

describe('OrderRow.vue', () => {
  const mockOrder = {
    orderNfId: '1605181324132',
    buyer: { name: 'SACADO 001' },
    provider: { name: 'CEDENTE 002' },
    emissionDate: '2020-10-30T11:00:00-03:00',
    value: '198450',
    statusDescription: 'Pendente de confirmação',
  };

  it('deve renderizar corretamente todos os dados da nota fiscal', () => {
    const wrapper = mount(OrderRow, {
      props: { order: mockOrder }
    });

    const texto = wrapper.text();

    expect(texto).toContain('1605181324132');
    expect(texto).toContain('SACADO 001');
    expect(texto).toContain('CEDENTE 002');
    expect(texto).toContain('30/10/2020');
    expect(texto).toContain('R$ 198.450,00');
    expect(texto).toContain('Pendente de confirmação');
    expect(texto).toContain('Dados do cedente');
  });

  it('deve aplicar estilo correto para status "Recebida e confirmada"', () => {
    const wrapper = mount(OrderRow, {
      props: {
        order: {
          ...mockOrder,
          statusDescription: 'Recebida e confirmada'
        }
      }
    });
  
    const statusEl = wrapper.find('span.text-brand-green');
    expect(statusEl.exists()).toBe(true);
    expect(statusEl.text()).toContain('Recebida e confirmada');
  });

  it('deve renderizar o botão "Dados do cedente"', () => {
    const wrapper = mount(OrderRow, {
      props: { order: mockOrder }
    });
  
    const botao = wrapper.find('button');
    expect(botao.exists()).toBe(true);
    expect(botao.text()).toBe('Dados do cedente');
  });
  
  
  
});

describe('formatCurrency', () => {
   
    it('formata valor corretamente em R$', () => {
      const formatted = OrderRow.methods.formatCurrency(198450);
      expect(formatted).toBe('198.450,00');
    });

    it('formata a data corretamente', () => {
        const data = OrderRow.methods.formatDate('2020-10-30T11:00:00-03:00');
        expect(data).toBe('30/10/2020');
    });
});
