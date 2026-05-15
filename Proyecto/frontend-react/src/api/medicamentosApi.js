import { apiClient } from './apiClient.js';

export async function fetchMedications() {
  const { data } = await apiClient.get('/api/medicamentos');
  return data;
}

export async function searchMedications(q) {
  const { data } = await apiClient.get('/api/medicamentos/buscar', { params: { q } });
  return data;
}

export async function fetchMedication(id) {
  const { data } = await apiClient.get(`/api/medicamentos/${id}`);
  return data;
}

export async function createMedication(body) {
  const { data } = await apiClient.post('/api/medicamentos', body);
  return data;
}

export async function updateMedication(id, body) {
  const { data } = await apiClient.put(`/api/medicamentos/${id}`, body);
  return data;
}

export async function deleteMedication(id) {
  await apiClient.delete(`/api/medicamentos/${id}`);
}
