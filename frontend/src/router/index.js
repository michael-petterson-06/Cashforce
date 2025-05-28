// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import TransferorDetails from '../views/TransferorDetails.vue';

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/usuarios',
    name: 'Users',
    component: Home,
  },
  {
    path: '/cedente/:id',
    name: 'TransferorDetails',
    component: TransferorDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
