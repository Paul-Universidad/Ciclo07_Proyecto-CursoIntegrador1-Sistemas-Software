import { apiClient } from './apiClient.js';

export async function fetchQuizQuestions() {
  const { data } = await apiClient.get('/api/aprendizaje/preguntas');
  return data;
}

export async function submitQuizAnswer(questionId, optionId) {
  const { data } = await apiClient.post('/api/aprendizaje/respuesta', { questionId, optionId });
  return data;
}
