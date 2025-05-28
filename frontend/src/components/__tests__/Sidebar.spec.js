import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Sidebar from '../Sidebar.vue';

const mountSidebar = (routePath = '/') => {
  return mount(Sidebar, {
    global: {
      mocks: {
        $route: { path: routePath }
      },
      stubs: {
        'router-link': {
          props: ['to'],
          template: `<a :href="to" v-bind="$attrs"><slot /></slot></a>`
        }
      }
    }
  });
};

describe('Sidebar.vue', () => {
  it('renderiza o logo e o texto do menu', () => {
    const wrapper = mountSidebar();

    expect(wrapper.text()).toContain('Notas fiscais');
    expect(wrapper.text()).toContain('Usuários');

    const logo = wrapper.find('img[alt="Cashforce Logo"]');
    expect(logo.exists()).toBe(true);
  });

  it('renderiza os ícones de navegação', () => {
    const wrapper = mountSidebar();
    const icones = wrapper.findAll('img');
    expect(icones.length).toBeGreaterThan(1);

    const notasIcone = wrapper.find('img[alt="Ícone Notas"]');
    expect(notasIcone.exists()).toBe(true);

    const usuariosIcone = wrapper.find('img[alt="Ícone Usuários"]');
    expect(usuariosIcone.exists()).toBe(true);
  });

  it('destaca o botão de Notas Fiscais quando na rota raiz', () => {
    const wrapper = mountSidebar('/');
    const notasButton = wrapper.find('[data-testid="notas-button"]');
    expect(notasButton.exists()).toBe(true);
    expect(notasButton.classes()).toContain('sidebar-active');
  });

  it('não destaca o botão de Notas Fiscais em outra rota', () => {
    const wrapper = mountSidebar('/usuarios');
    const notasButton = wrapper.find('[data-testid="notas-button"]');
    expect(notasButton.exists()).toBe(true);
    expect(notasButton.classes()).not.toContain('sidebar-active');
  });
});
