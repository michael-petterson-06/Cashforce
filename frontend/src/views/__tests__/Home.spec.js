import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import Home from '../Home.vue';
import TransferorDetails from '../TransferorDetails.vue';
import { nextTick } from 'vue';

vi.mock('../../services/orderService', () => ({
  getOrders: () => Promise.resolve([
    {
      id: 1,
      orderNfId: '1605181324132',
      buyer: { name: 'SACADO 001' },
      provider: { name: 'CEDENTE 002' },
      emissionDate: '2020-10-29T00:00:00',
      value: '198450.00',
      statusDescription: 'Pendente de confirmação'
    }
  ])
}));

vi.mock('../../services/userService', () => ({
  getUsers: () => Promise.resolve([
    {
      id: 10,
      name: 'João',
      email: 'joao@email.com',
      phoneNumber: '(11) 1111-1111',
      mobile: '(11) 99999-9999',
      departament: 'TI'
    }
  ])
}));

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/usuarios', name: 'Users', component: Home },
  { path: '/cedente/:id', name: 'TransferorDetails', component: TransferorDetails }
];


const createWrapper = async (initialRoute = '/') => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes
  });

  router.push(initialRoute);
  await router.isReady();

  return mount(Home, {
    global: {
      plugins: [router]
    }
  });
};

describe('Home.vue', () => {
  it('renderiza a lista de pedidos (BaseRow)', async () => {
    const wrapper = await createWrapper('/');
    await nextTick();

    expect(wrapper.text()).toContain('1605181324132');
    expect(wrapper.text()).toContain('SACADO 001');
    expect(wrapper.text()).toContain('CEDENTE 002');
  });

  it('renderiza o título "Notas fiscais" na rota raiz', async () => {
    const wrapper = await createWrapper('/');
    await nextTick();

    expect(wrapper.text()).toContain('Notas fiscais');
  });

  it('renderiza o título "Usuários" na rota /usuarios', async () => {
    const wrapper = await createWrapper('/usuarios');
    await nextTick();

    expect(wrapper.text()).toContain('Usuários');
    expect(wrapper.text()).toContain('João');
    expect(wrapper.text()).toContain('joao@email.com');
    expect(wrapper.text()).toContain('TI');
  });
});
