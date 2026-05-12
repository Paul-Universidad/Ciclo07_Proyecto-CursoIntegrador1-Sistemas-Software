import { apiClient } from './axiosConfig.js';

export async function fetchQuizQuestions() {
  const { data } = await apiClient.get('/api/quiz/questions');
  return data;
}

export async function submitQuizAnswer(questionId, optionId) {
  const { data } = await apiClient.post('/api/quiz/answer', { questionId, optionId });
  return data;
}
