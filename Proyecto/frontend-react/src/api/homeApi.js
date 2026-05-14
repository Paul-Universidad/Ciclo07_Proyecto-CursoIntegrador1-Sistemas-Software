import { apiClient } from './axiosConfig.js';

export async function fetchHomeSummary() {
  const { data } = await apiClient.get('/api/home/summary');
  return data;
}
