import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import TransferorDetails from '../TransferorDetails.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router';
import * as orderService from '@/services/orderService';

vi.mock('@/services/orderService');

const mockOrder = {
  provider: {
    id: 1,
    name: 'CEDENTE MOCK',
    situationDate: '29/10/2020',
  },
};

let router;

async function createWrapper() {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });
  await router.push('/cedente/1');
  await router.isReady();

  return mount(TransferorDetails, {
    global: {
      plugins: [router],
    },
  });
}

describe('TransferorDetails.vue', () => {
  beforeEach(() => {
    orderService.getOrderById.mockResolvedValue(mockOrder);
  });

  it('renderiza o título corretamente', async () => {
    const wrapper = await createWrapper();
    await flushPromises();
    expect(wrapper.text()).toContain('Dados do Cedente');
  });

  it('exibe loading quando os dados ainda estão sendo carregados', () => {
  
    const wrapper = mount(TransferorDetails, {
      global: {
        plugins: [createRouter({ history: createWebHistory(), routes })],
      },
    });

    expect(wrapper.text()).toContain('Carregando dados...');
  });

  it('renderiza os dados do cedente corretamente', async () => {
    const wrapper = await createWrapper();
    await flushPromises();

    expect(wrapper.text()).toContain('CEDENTE MOCK');
    expect(wrapper.text()).toContain('29/10/2020');
  });
});
