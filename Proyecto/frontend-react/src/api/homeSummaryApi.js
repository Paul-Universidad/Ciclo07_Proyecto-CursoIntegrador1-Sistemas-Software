import { apiClient } from './apiClient.js';

export async function fetchHomeSummary() {
  const { data } = await apiClient.get('/api/inicio/resumen');
  return data;
}
