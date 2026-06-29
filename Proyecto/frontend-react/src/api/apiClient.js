import axios from 'axios';

// En producción usa la URL de Render. En local, confía en el proxy de Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Necesario si activaste allowCredentials en Spring Boot
  headers: { 'Content-Type': 'application/json' },
});
