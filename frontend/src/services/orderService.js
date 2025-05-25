import axios from 'axios';

// const API_URL = 'http://localhost:3000';

const API_URL = 'https://cashforce-production.up.railway.app';


export async function getOrders() {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
}
