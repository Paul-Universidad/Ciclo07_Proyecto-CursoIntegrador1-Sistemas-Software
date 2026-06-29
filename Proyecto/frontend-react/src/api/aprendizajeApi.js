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

export async function fetchCasoAleatorio(excluirId) {
  const { data } = await apiClient.get('/api/aprendizaje/casos/aleatorio', {
    params: excluirId != null ? { excluirId } : {},
  });
  return data;
}

export async function responderCaso({ caseId, diagnosisOptionId, justificationOptionId }) {
  const { data } = await apiClient.post('/api/aprendizaje/casos/responder', {
    caseId,
    diagnosisOptionId,
    justificationOptionId,
  });
  return data;
}

/** Registra una partida jugada; los errores se ignoran para no molestar al jugador. */
export async function registrarActividad({ userId, game, total, correct }) {
  if (!userId) return;
  try {
    await apiClient.post('/api/aprendizaje/actividad', { userId, game, total, correct });
  } catch {
    // El registro de estadísticas no debe interrumpir el juego.
  }
}

export async function fetchEstadisticas(usuarioId) {
  const { data } = await apiClient.get('/api/aprendizaje/estadisticas', {
    params: { usuarioId },
  });
  return data;
}
