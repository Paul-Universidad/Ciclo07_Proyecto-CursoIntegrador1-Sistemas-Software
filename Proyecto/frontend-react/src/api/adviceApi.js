import { apiClient } from './axiosConfig.js';

export async function fetchAdvice(topic) {
  const { data } = await apiClient.post('/api/advice', { topic });
  return data;
}
