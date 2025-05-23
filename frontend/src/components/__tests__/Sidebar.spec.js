import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Sidebar from '../Sidebar.vue';

describe('Sidebar.vue', () => {
  it('renderiza o logo e o texto do menu', () => {
    const wrapper = mount(Sidebar, {
      global: {
        stubs: {
           'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    });
 
    expect(wrapper.text()).toContain('Notas fiscais');

    const logo = wrapper.find('img[alt="Cashforce Logo"]');
    expect(logo.exists()).toBe(true);

    const icon = wrapper.find('img[alt="Ícone Notas"]');
    expect(icon.exists()).toBe(true);
  });
});
