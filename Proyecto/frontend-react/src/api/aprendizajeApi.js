import { apiClient } from './apiClient.js';

export async function fetchQuizAleatorio(cantidad = 10) {
  const { data } = await apiClient.get('/api/aprendizaje/quiz', {
    params: { cantidad },
  });
  return data;
}

export async function corregirQuiz(answers) {
  const { data } = await apiClient.post('/api/aprendizaje/quiz/corregir', { answers });
  return data;
}

export async function fetchParrafoAleatorio(excluirId) {
  const { data } = await apiClient.get('/api/aprendizaje/parrafos/aleatorio', {
    params: excluirId != null ? { excluirId } : {},
  });
  return data;
}
