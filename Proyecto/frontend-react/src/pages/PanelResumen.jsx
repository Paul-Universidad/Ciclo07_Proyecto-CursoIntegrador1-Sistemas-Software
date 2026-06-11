import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEstadisticas } from '../api/aprendizajeApi.js';
import { useHomeSummary } from '../hooks/useHomeSummary.js';
import { useAuth } from '../context/AuthContext.jsx';

const infoJuego = {
  QUIZ: { nombre: 'Quiz de medicina', icono: '❓', barra: 'bg-blue-500', chip: 'bg-blue-100 text-blue-700', link: '/aprendizaje/quiz' },
  COMPLETAR: { nombre: 'Completar palabras', icono: '✏️', barra: 'bg-emerald-500', chip: 'bg-emerald-100 text-emerald-700', link: '/aprendizaje/completar' },
  CASOS: { nombre: 'Tutorial para ser médico', icono: '🩺', barra: 'bg-rose-500', chip: 'bg-rose-100 text-rose-700', link: '/aprendizaje/casos' },
};

function porcentaje(correct, total) {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

function formatearFecha(iso) {
  if (!iso) return '';
  const fecha = new Date(iso);
  return fecha.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
}

/** Gráfico de anillo (SVG puro) con la precisión global. */
function GraficoDonut({ valor }) {
  const radio = 54;
  const circ = 2 * Math.PI * radio;
  const lleno = (valor / 100) * circ;

  return (
    <svg viewBox="0 0 140 140" className="h-44 w-44" role="img" aria-label={`Precisión ${valor}%`}>
      <circle cx="70" cy="70" r={radio} fill="none" stroke="#e2e8f0" strokeWidth="14" />
      <circle
        cx="70"
        cy="70"
        r={radio}
        fill="none"
        stroke="url(#gradDonut)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={`${lleno} ${circ - lleno}`}
        transform="rotate(-90 70 70)"
      />
      <defs>
        <linearGradient id="gradDonut" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <text x="70" y="66" textAnchor="middle" className="fill-slate-900" fontSize="28" fontWeight="800">
        {valor}%
      </text>
      <text x="70" y="86" textAnchor="middle" className="fill-slate-400" fontSize="11" fontWeight="600">
        precisión
      </text>
    </svg>
  );
}

export function PanelResumen() {
  const { summary } = useHomeSummary();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    fetchEstadisticas(user.id)
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.error ?? e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const precisionGlobal = stats ? porcentaje(stats.totalCorrect, stats.totalQuestions) : 0;
  const sinActividad = stats && stats.totalSessions === 0;

  const tarjetas = stats
    ? [
        { etiqueta: 'Partidas jugadas', valor: stats.totalSessions, icono: '🎮', color: 'from-blue-500 to-indigo-500' },
        { etiqueta: 'Preguntas respondidas', valor: stats.totalQuestions, icono: '📝', color: 'from-emerald-500 to-teal-500' },
        { etiqueta: 'Aciertos totales', valor: stats.totalCorrect, icono: '✅', color: 'from-amber-500 to-orange-500' },
        { etiqueta: 'Precisión global', valor: `${precisionGlobal}%`, icono: '🎯', color: 'from-purple-500 to-pink-500' },
      ]
    : [];

  // Historial invertido para graficar de la partida más antigua a la más nueva.
  const recientes = stats ? [...stats.recent].reverse() : [];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 p-8 text-white shadow-lg">
          <h1 className="text-3xl font-extrabold">📊 Panel de aprendizaje</h1>
          <p className="mt-2 opacity-90">
            {user?.fullName}, aquí está tu progreso en los minijuegos del módulo de
            aprendizaje.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <p className="rounded-2xl bg-white p-10 text-center text-slate-500 shadow-sm">
            Calculando tus estadísticas…
          </p>
        )}

        {!loading && sinActividad && (
          <div className="mb-8 rounded-2xl border-2 border-dashed border-purple-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl">
              🎮
            </div>
            <p className="text-lg font-semibold text-slate-700">
              Aún no tienes partidas registradas
            </p>
            <p className="mt-1 text-slate-500">
              Juega cualquier minijuego del módulo de aprendizaje y tus estadísticas
              aparecerán aquí.
            </p>
            <Link
              to="/aprendizaje"
              className="mt-5 inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Ir a los minijuegos
            </Link>
          </div>
        )}

        {!loading && stats && !sinActividad && (
          <>
            {/* Tarjetas resumen */}
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {tarjetas.map((t) => (
                <div
                  key={t.etiqueta}
                  className={`rounded-2xl bg-gradient-to-br ${t.color} p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="text-3xl" aria-hidden="true">{t.icono}</div>
                  <p className="mt-2 text-3xl font-extrabold">{t.valor}</p>
                  <p className="text-sm font-medium opacity-90">{t.etiqueta}</p>
                </div>
              ))}
            </div>

            <div className="mb-8 grid gap-6 lg:grid-cols-5">
              {/* Donut de precisión global */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <h2 className="mb-2 text-lg font-bold text-slate-900">🎯 Precisión global</h2>
                <GraficoDonut valor={precisionGlobal} />
                <p className="mt-2 text-center text-sm text-slate-500">
                  {stats.totalCorrect} aciertos de {stats.totalQuestions} preguntas
                  respondidas
                </p>
              </div>

              {/* Barras por minijuego */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
                <h2 className="mb-5 text-lg font-bold text-slate-900">
                  🕹️ Rendimiento por minijuego
                </h2>
                <div className="space-y-5">
                  {stats.perGame.map((g) => {
                    const info = infoJuego[g.game] ?? { nombre: g.game, icono: '🎮', barra: 'bg-slate-400', chip: 'bg-slate-100 text-slate-600', link: '/aprendizaje' };
                    const pct = porcentaje(g.correct, g.questions);
                    return (
                      <div key={g.game}>
                        <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                          <Link to={info.link} className="font-semibold text-slate-800 hover:text-purple-600">
                            {info.icono} {info.nombre}
                          </Link>
                          <span className="text-slate-500">
                            {g.sessions} {g.sessions === 1 ? 'partida' : 'partidas'} ·{' '}
                            <strong className="text-slate-700">{pct}%</strong>
                          </span>
                        </div>
                        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-3 rounded-full ${info.barra} transition-all duration-700`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-slate-400">
                          {g.correct} aciertos de {g.questions} preguntas
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mb-8 grid gap-6 lg:grid-cols-2">
              {/* Gráfico de últimas partidas */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-1 text-lg font-bold text-slate-900">
                  📈 Tus últimas partidas
                </h2>
                <p className="mb-5 text-xs text-slate-400">
                  Altura = % de aciertos en cada partida (de la más antigua a la más
                  reciente)
                </p>
                <div className="flex h-44 items-end justify-around gap-2">
                  {recientes.map((a, i) => {
                    const info = infoJuego[a.game] ?? { barra: 'bg-slate-400', icono: '🎮' };
                    const pct = porcentaje(a.correct, a.total);
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1" title={`${pct}% de aciertos`}>
                        <span className="text-xs font-bold text-slate-600">{pct}%</span>
                        <div className="flex h-28 w-full max-w-10 items-end overflow-hidden rounded-t-lg bg-slate-100">
                          <div
                            className={`w-full rounded-t-lg ${info.barra} transition-all duration-700`}
                            style={{ height: `${Math.max(pct, 4)}%` }}
                          />
                        </div>
                        <span className="text-base" aria-hidden="true">{info.icono}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Historial reciente */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-bold text-slate-900">🕑 Actividad reciente</h2>
                <div className="space-y-3">
                  {stats.recent.map((a, i) => {
                    const info = infoJuego[a.game] ?? { nombre: a.game, icono: '🎮', chip: 'bg-slate-100 text-slate-600' };
                    const pct = porcentaje(a.correct, a.total);
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl" aria-hidden="true">{info.icono}</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{info.nombre}</p>
                            <p className="text-xs text-slate-400">{formatearFecha(a.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${info.chip}`}>
                            {a.correct}/{a.total}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              pct >= 70
                                ? 'bg-green-100 text-green-700'
                                : pct >= 40
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {pct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Resumen del sistema */}
        {summary && (
          <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 p-6 shadow-inner">
            <h2 className="mb-4 text-lg font-bold text-slate-900">📚 Contenido disponible para seguir aprendiendo</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Link to="/medicamentos" className="rounded-xl bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-2xl font-extrabold text-blue-600">{summary.medicationCount}</p>
                <p className="text-xs font-semibold text-slate-500">💊 Medicamentos</p>
              </Link>
              <Link to="/consulta" className="rounded-xl bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-2xl font-extrabold text-rose-600">{summary.ailmentCount}</p>
                <p className="text-xs font-semibold text-slate-500">🩺 Dolencias</p>
              </Link>
              <Link to="/aprendizaje/quiz" className="rounded-xl bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-2xl font-extrabold text-violet-600">{summary.quizQuestionCount}</p>
                <p className="text-xs font-semibold text-slate-500">❓ Preguntas de quiz</p>
              </Link>
              <Link to="/aprendizaje/casos" className="rounded-xl bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-2xl font-extrabold text-emerald-600">{summary.clinicalCaseCount}</p>
                <p className="text-xs font-semibold text-slate-500">🧑‍⚕️ Casos clínicos</p>
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
