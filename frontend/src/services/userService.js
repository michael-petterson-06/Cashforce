import { api } from './api';

export async function getUsers() {
  const response = await api.get('/users');
  console.log('users: ', response)
  return response.data;
}
