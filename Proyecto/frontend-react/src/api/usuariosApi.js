import { apiClient } from './apiClient.js';

export async function loginUsuario(usuario, contrasenia) {
  const { data } = await apiClient.get('/api/usuarios/login', {
    params: { usuario, contrasenia },
  });
  return data;
}
