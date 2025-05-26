import { api } from './api';

export async function getOrders() {
  const response = await api.get('/orders');
   return response.data;
}

export async function getOrderById(id) {
  const response = await api.get(`/orders/${id}`);
  console.log('response: ', response)
  return response.data;
}
