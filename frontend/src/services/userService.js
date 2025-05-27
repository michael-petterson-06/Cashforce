import { api } from './api';

export async function getUsers() {
  const response = await api.get('/users');
  return response.data;
}

export async function deleteUser(id) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}

export async function createUser(data) {
  const response = await api.post('/users', data);
  return response.data;
}