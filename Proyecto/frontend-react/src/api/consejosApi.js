import { apiClient } from './apiClient.js';

export async function solicitarConsejoPorTema(topic) {
  const { data } = await apiClient.post('/api/consejos', { topic });
  return data;
}
