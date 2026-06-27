import { apiClient } from './apiClient.js';

export async function loginUsuario(usuario, contrasenia) {
  const { data } = await apiClient.get('/api/usuarios/login', {
    params: { usuario, contrasenia },
  });
  return data;
}

export async function registrarUsuario({ username, password, fullName, type, email }) {
  const { data } = await apiClient.post('/api/usuarios/registro', {
    username,
    password,
    fullName,
    type,
    email,
  });
  return data;
}
