import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseRow from '../BaseRow.vue';

describe('BaseRow.vue', () => {
  const mockFields = [
    { label: 'Nota Fiscal', value: '1605181324132' },
    { label: 'Sacado', value: 'SACADO 001' },
    { label: 'Cedente', value: 'CEDENTE 002' },
    { label: 'Emissão', value: '30/10/2020' },
    { label: 'Valor', value: 'R$ 198.450,00' },
    { label: 'Status', value: 'Pendente de confirmação' }
  ];

  const mockActions = {
    status: 'Pendente de confirmação',
    buttonLabel: 'Dados do cedente'
  };

  const globalMocks = {
    global: {
      mocks: {
        $route: { path: '/' }
      }
    }
  };

  it('deve renderizar corretamente todos os dados da nota fiscal', () => {
    const wrapper = mount(BaseRow, {
      props: { fields: mockFields, actions: mockActions },
      ...globalMocks
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

  it('deve aplicar estilo correto para status', () => {
    const wrapper = mount(BaseRow, {
      props: { fields: mockFields, actions: mockActions },
      ...globalMocks
    });

    const statusEl = wrapper.find('span.text-brand-green');
    expect(statusEl.exists()).toBe(true);
    expect(statusEl.text()).toContain('Pendente de confirmação');
  });

  it('deve renderizar o botão "Dados do cedente"', () => {
    const wrapper = mount(BaseRow, {
      props: { fields: mockFields, actions: mockActions },
      ...globalMocks
    });

    const botao = wrapper.find('button');
    expect(botao.exists()).toBe(true);
    expect(botao.text()).toBe('Dados do cedente');
  });
});
