import { apiClient } from './axiosConfig.js';

export async function fetchMedications() {
  const { data } = await apiClient.get('/api/medications');
  return data;
}

export async function searchMedications(q) {
  const { data } = await apiClient.get('/api/medications/search', { params: { q } });
  return data;
}

export async function fetchMedication(id) {
  const { data } = await apiClient.get(`/api/medications/${id}`);
  return data;
}

export async function createMedication(body) {
  const { data } = await apiClient.post('/api/medications', body);
  return data;
}

export async function updateMedication(id, body) {
  const { data } = await apiClient.put(`/api/medications/${id}`, body);
  return data;
}

export async function deleteMedication(id) {
  await apiClient.delete(`/api/medications/${id}`);
}
