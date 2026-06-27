import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { corregirQuiz, fetchQuizAleatorio, registrarActividad } from '../api/aprendizajeApi.js';
import { useAuth } from '../context/AuthContext.jsx';

export function AprendizajeQuiz() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [selection, setSelection] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setSelection({});
    try {
      const data = await fetchQuizAleatorio(10);
      setQuestions(data);
    } catch (e) {
      setError(e?.response?.data?.error ?? e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  async function onSave() {
    setError(null);

    const answers = questions
      .filter((q) => selection[q.id] != null)
      .map((q) => ({ questionId: q.id, optionId: selection[q.id] }));

    if (answers.length === 0) {
      setError('Marca al menos una alternativa antes de guardar.');
      return;
    }

    try {
      const data = await corregirQuiz(answers);
      setResult(data);
      registrarActividad({
        userId: user?.id,
        game: 'QUIZ',
        total: questions.length,
        correct: data.correctas,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setError(e?.response?.data?.error ?? e.message);
    }
  }

  const resultByQuestion = result
    ? Object.fromEntries(result.resultados.map((r) => [r.questionId, r]))
    : {};

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Quiz de medicina
          </h1>
          <p className="text-slate-600">
            10 preguntas aleatorias sobre medicamentos y dolencias.
          </p>
        </div>

        <Link
          to="/aprendizaje"
          className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Volver
        </Link>
      </div>

      {result && (
        <div
          className={`mb-6 rounded-xl border p-5 ${
            result.correctas >= result.total / 2
              ? 'border-green-200 bg-green-50'
              : 'border-yellow-200 bg-yellow-50'
          }`}
        >
          <p className="text-lg font-bold text-slate-900">
            Resultado: {result.correctas} de {questions.length} correctas
          </p>
          <p className="text-sm text-slate-600 mt-1">
            Revisa abajo el detalle de cada pregunta. Pulsa «Actualizar» para
            intentar con otras 10 preguntas.
          </p>
        </div>
      )}

      {error && (
        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </p>
      )}

      <div className="mb-6 flex gap-3">
        <button
          type="button"
          onClick={loadQuestions}
          className="rounded-lg border border-blue-600 px-5 py-2.5 font-medium text-blue-600 transition hover:bg-blue-50"
        >
          🔄 Actualizar
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={loading || result != null}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          💾 Guardar
        </button>
      </div>

      {loading && <p className="text-slate-500">Cargando preguntas…</p>}

      <div className="space-y-6">
        {!loading &&
          questions.map((q, idx) => {
            const r = resultByQuestion[q.id];
            const sinResponder = result && !r;

            return (
              <section
                key={q.id}
                className={`rounded-xl border bg-white p-6 shadow-sm ${
                  r
                    ? r.correct
                      ? 'border-green-300'
                      : 'border-red-300'
                    : 'border-slate-200'
                }`}
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Pregunta {idx + 1} de {questions.length}
                  </h2>

                  {r && (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        r.correct
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {r.correct ? '✓ Correcta' : '✗ Incorrecta'}
                    </span>
                  )}

                  {sinResponder && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      Sin responder
                    </span>
                  )}
                </div>

                <p className="mb-4 font-medium text-slate-700">{q.prompt}</p>

                <div className="space-y-3">
                  {q.options.map((o) => {
                    const seleccionada = selection[q.id] === o.id;
                    const esCorrecta = r && r.correctOptionId === o.id;
                    const esIncorrectaMarcada =
                      r && !r.correct && r.selectedOptionId === o.id;

                    let estilo =
                      'border-slate-200 bg-slate-50 hover:bg-slate-100';
                    if (esCorrecta) {
                      estilo = 'border-green-500 bg-green-50';
                    } else if (esIncorrectaMarcada) {
                      estilo = 'border-red-500 bg-red-50';
                    } else if (seleccionada) {
                      estilo = 'border-blue-500 bg-blue-50';
                    }

                    return (
                      <label
                        key={o.id}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition ${
                          result ? 'cursor-default' : 'cursor-pointer'
                        } ${estilo}`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={seleccionada}
                          disabled={result != null}
                          onChange={() =>
                            setSelection((s) => ({ ...s, [q.id]: o.id }))
                          }
                          className="h-4 w-4 accent-blue-600"
                        />
                        <span className="text-sm text-slate-700">{o.text}</span>
                        {esCorrecta && (
                          <span className="ml-auto text-green-600">✓</span>
                        )}
                        {esIncorrectaMarcada && (
                          <span className="ml-auto text-red-600">✗</span>
                        )}
                      </label>
                    );
                  })}
                </div>

                {r?.explanation && (
                  <p className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                    💡 {r.explanation}
                  </p>
                )}
              </section>
            );
          })}
      </div>

      {!loading && questions.length > 0 && !result && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            💾 Guardar respuestas
          </button>
        </div>
      )}
    </main>
  );
}
