import { apiClient } from './apiClient.js';

export async function enviarMensaje(mensaje) {
  try {
    const { data } = await apiClient.post('/api/chatbot/mensaje', { mensaje });
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.respuesta;
  } catch (error) {
    console.error('Error en enviarMensaje:', error);
    // Propaga el error para que el componente lo maneje
    throw error;
  }
}