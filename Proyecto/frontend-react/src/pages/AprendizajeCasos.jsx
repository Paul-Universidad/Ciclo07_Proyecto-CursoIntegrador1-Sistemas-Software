import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCasoAleatorio, registrarActividad, responderCaso } from '../api/aprendizajeApi.js';
import { useAuth } from '../context/AuthContext.jsx';

function claseOpcion({ id, seleccionado, resultado, correctoId }) {
  if (!resultado) {
    return id === seleccionado
      ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-200'
      : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/50';
  }
  if (id === correctoId) {
    return 'border-green-500 bg-green-50';
  }
  if (id === seleccionado) {
    return 'border-red-400 bg-red-50';
  }
  return 'border-slate-200 bg-white opacity-60';
}

export function AprendizajeCasos() {
  const { user } = useAuth();
  const [caso, setCaso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [diagnostico, setDiagnostico] = useState(null);
  const [justificacion, setJustificacion] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [stats, setStats] = useState({ atendidos: 0, perfectos: 0 });

  const cargarCaso = useCallback(async (excluirId) => {
    setLoading(true);
    setError(null);
    setDiagnostico(null);
    setJustificacion(null);
    setResultado(null);
    try {
      const data = await fetchCasoAleatorio(excluirId);
      setCaso(data);
    } catch (e) {
      setError(e?.response?.data?.error ?? e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarCaso();
  }, [cargarCaso]);

  async function onResponder() {
    if (!caso || diagnostico == null || justificacion == null) return;
    setEnviando(true);
    setError(null);
    try {
      const data = await responderCaso({
        caseId: caso.id,
        diagnosisOptionId: diagnostico,
        justificationOptionId: justificacion,
      });
      setResultado(data);
      setStats((s) => ({
        atendidos: s.atendidos + 1,
        perfectos: s.perfectos + (data.diagnosisCorrect && data.justificationCorrect ? 1 : 0),
      }));
      registrarActividad({
        userId: user?.id,
        game: 'CASOS',
        total: 2,
        correct: (data.diagnosisCorrect ? 1 : 0) + (data.justificationCorrect ? 1 : 0),
      });
    } catch (e) {
      setError(e?.response?.data?.error ?? e.message);
    } finally {
      setEnviando(false);
    }
  }

  const pasoActual = resultado ? 3 : justificacion != null ? 3 : diagnostico != null ? 2 : 1;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/aprendizaje"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            ← Volver
          </Link>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="rounded-full bg-rose-100 px-4 py-1.5 text-rose-700">
              🩺 Pacientes atendidos: {stats.atendidos}
            </span>
            <span className="rounded-full bg-green-100 px-4 py-1.5 text-green-700">
              ⭐ Consultas perfectas: {stats.perfectos}
            </span>
          </div>
        </div>

        <div className="mb-8 rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 p-8 text-white shadow-lg">
          <h1 className="text-3xl font-extrabold">Tutorial para ser médico</h1>
          <p className="mt-2 opacity-90">
            Hoy el doctor eres tú: lee la historia del paciente, da el diagnóstico más
            probable y justifica tu decisión.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <p className="rounded-2xl bg-white p-10 text-center text-slate-500 shadow-sm">
            Llamando al siguiente paciente…
          </p>
        )}

        {!loading && caso && (
          <>
            {/* Pasos */}
            <div className="mb-6 flex items-center justify-center gap-2 text-xs font-bold sm:text-sm">
              {['Lee el caso', 'Diagnostica', 'Justifica'].map((paso, i) => (
                <span
                  key={paso}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 ${
                    pasoActual > i
                      ? 'bg-rose-600 text-white'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                      pasoActual > i ? 'bg-white/25' : 'bg-slate-100'
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {paso}
                </span>
              ))}
            </div>

            {/* Ficha del paciente */}
            <article className="mb-6 overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-rose-100 bg-rose-50 px-6 py-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-200 text-2xl">
                  🧑‍⚕️
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-rose-500">
                    Historia clínica
                  </p>
                  <h2 className="text-xl font-bold text-slate-900">{caso.title}</h2>
                </div>
              </div>
              <p className="px-6 py-5 leading-relaxed text-slate-700">{caso.profile}</p>
            </article>

            {/* Diagnóstico */}
            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                🔬 ¿Cuál es el diagnóstico más probable?
              </h3>
              <div className="grid gap-3">
                {caso.diagnoses.map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    disabled={!!resultado}
                    onClick={() => setDiagnostico(op.id)}
                    className={`rounded-xl border-2 px-4 py-3 text-left font-medium text-slate-800 transition ${claseOpcion(
                      {
                        id: op.id,
                        seleccionado: diagnostico,
                        resultado,
                        correctoId: resultado?.correctDiagnosisId,
                      }
                    )}`}
                  >
                    {op.text}
                    {resultado && op.id === resultado.correctDiagnosisId && ' ✅'}
                    {resultado &&
                      op.id === diagnostico &&
                      op.id !== resultado.correctDiagnosisId &&
                      ' ❌'}
                  </button>
                ))}
              </div>
            </section>

            {/* Justificación (aparece al elegir diagnóstico) */}
            {diagnostico != null && (
              <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  🧠 ¿Por qué? Justifica tu respuesta
                </h3>
                <div className="grid gap-3">
                  {caso.justifications.map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      disabled={!!resultado}
                      onClick={() => setJustificacion(op.id)}
                      className={`rounded-xl border-2 px-4 py-3 text-left font-medium text-slate-800 transition ${claseOpcion(
                        {
                          id: op.id,
                          seleccionado: justificacion,
                          resultado,
                          correctoId: resultado?.correctJustificationId,
                        }
                      )}`}
                    >
                      {op.text}
                      {resultado && op.id === resultado.correctJustificationId && ' ✅'}
                      {resultado &&
                        op.id === justificacion &&
                        op.id !== resultado.correctJustificationId &&
                        ' ❌'}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Resultado */}
            {resultado && (
              <section
                className={`mb-6 rounded-2xl border-2 p-6 shadow-sm ${
                  resultado.diagnosisCorrect && resultado.justificationCorrect
                    ? 'border-green-300 bg-green-50'
                    : resultado.diagnosisCorrect || resultado.justificationCorrect
                      ? 'border-amber-300 bg-amber-50'
                      : 'border-red-300 bg-red-50'
                }`}
              >
                <h3 className="mb-2 text-xl font-extrabold text-slate-900">
                  {resultado.diagnosisCorrect && resultado.justificationCorrect
                    ? '🎉 ¡Consulta perfecta, doctor!'
                    : resultado.diagnosisCorrect
                      ? '🩺 Buen diagnóstico, pero revisa tu justificación'
                      : resultado.justificationCorrect
                        ? '🤔 Buen razonamiento, pero el diagnóstico no era ese'
                        : '📚 Esta consulta se complicó… ¡sigue practicando!'}
                </h3>
                <p className="text-sm font-semibold text-slate-600">
                  Diagnóstico: {resultado.diagnosisCorrect ? 'correcto ✅' : 'incorrecto ❌'} ·
                  Justificación: {resultado.justificationCorrect ? 'correcta ✅' : 'incorrecta ❌'}
                </p>
                {resultado.explanation && (
                  <div className="mt-4 rounded-xl bg-white/70 p-4">
                    <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                      Explicación del especialista
                    </p>
                    <p className="mt-1 text-slate-700">{resultado.explanation}</p>
                  </div>
                )}
              </section>
            )}

            {/* Acciones */}
            <div className="flex flex-wrap gap-3">
              {!resultado && (
                <button
                  type="button"
                  onClick={onResponder}
                  disabled={diagnostico == null || justificacion == null || enviando}
                  className="rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {enviando ? 'Evaluando…' : '🩺 Confirmar diagnóstico'}
                </button>
              )}
              <button
                type="button"
                onClick={() => cargarCaso(caso.id)}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {resultado ? 'Siguiente paciente →' : '🔄 Otro caso'}
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
