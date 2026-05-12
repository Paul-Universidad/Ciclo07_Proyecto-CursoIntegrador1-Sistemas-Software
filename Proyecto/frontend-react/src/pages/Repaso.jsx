import { useEffect, useState } from 'react';
import { fetchQuizQuestions, submitQuizAnswer } from '../api/quizApi.js';

export function Repaso() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [selection, setSelection] = useState({});
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    let cancelled = false;
    fetchQuizQuestions()
      .then((data) => {
        if (!cancelled) setQuestions(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.error ?? e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function onVerify(questionId) {
    const optionId = selection[questionId];
    if (!optionId) {
      setFeedback((f) => ({
        ...f,
        [questionId]: { error: 'Elige una opción.' },
      }));
      return;
    }
    try {
      const res = await submitQuizAnswer(questionId, optionId);
      setFeedback((f) => ({
        ...f,
        [questionId]: { correct: res.correct, explanation: res.explanation },
      }));
    } catch (e) {
      setFeedback((f) => ({
        ...f,
        [questionId]: { error: e?.response?.data?.error ?? e.message },
      }));
    }
  }

  return (
    <main className="apf-shell apf-shell-wide">
      <h1 className="apf-page-title">Módulo de aprendizaje</h1>
      <p className="muted">Responde las preguntas y comprueba tu comprensión.</p>
      {error && <p className="apf-error">{error}</p>}
      {questions.map((q, idx) => (
        <section key={q.id} className="apf-quiz-card">
          <h2>
            Pregunta {idx + 1} de {questions.length}
          </h2>
          <p className="apf-quiz-prompt">{q.prompt}</p>
          {feedback[q.id]?.error && <p className="apf-error">{feedback[q.id].error}</p>}
          {feedback[q.id]?.explanation != null && (
            <p className={feedback[q.id].correct ? 'apf-feedback-ok' : 'apf-feedback-bad'}>
              {feedback[q.id].correct ? '✓ Correcto. ' : '✗ Incorrecto. '}
              {feedback[q.id].explanation}
            </p>
          )}
          <div className="apf-form">
            {q.options.map((o) => (
              <label key={o.id} className="apf-option">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={selection[q.id] === o.id}
                  onChange={() => setSelection((s) => ({ ...s, [q.id]: o.id }))}
                />
                <span>{o.text}</span>
              </label>
            ))}
            <button
              type="button"
              className="apf-btn apf-btn-primary"
              style={{ marginTop: '0.75rem' }}
              onClick={() => onVerify(q.id)}
            >
              Comprobar respuesta
            </button>
          </div>
        </section>
      ))}
    </main>
  );
}
