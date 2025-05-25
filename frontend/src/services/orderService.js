import { api } from './api';

export async function getOrders() {
  const response = await api.get('/orders');
  console.log('orders: ', response)
  return response.data;
}
