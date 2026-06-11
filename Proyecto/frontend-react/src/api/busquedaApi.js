import { apiClient } from './apiClient.js';

/** Búsqueda combinada de medicamentos y dolencias. */
export async function buscarGlobal(q) {
  const { data } = await apiClient.get('/api/busqueda', { params: { q } });
  return data;
}
