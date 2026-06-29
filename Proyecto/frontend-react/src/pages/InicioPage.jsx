import { Link } from "react-router-dom";
import { useHomeSummary } from "../hooks/useHomeSummary.js";
import { useAuth } from "../context/AuthContext.jsx";
import { puedeAcceder } from "../utils/roles.js";

const saludoTipo = {
  USUARIO_GENERAL: "Explora el diccionario y resuelve tus dudas sobre medicamentos.",
  ESTUDIANTE: "Repasa, juega y conviértete en un experto en farmacología.",
  ADMIN: "Gestiona el contenido y supervisa toda la plataforma.",
};

export function InicioPage() {
  const { summary, error, loading } = useHomeSummary();
  const { user } = useAuth();

  const allFeatures = [
    {
      title: "Panel de Control",
      description: "Accede a tu dashboard personalizado con estadísticas y accesos rápidos",
      icon: "📊",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/panel",
      modulo: "panel",
    },
    {
      title: "Búsqueda Inteligente",
      description: "Busca un medicamento o dolencia y descubre su significado, usos y consejos",
      icon: "🔍",
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/consulta",
      modulo: "consulta",
    },
    {
      title: "Diccionario de Medicamentos",
      description: "Explora fichas completas: usos, dosis, precauciones e interacciones",
      icon: "💊",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      link: "/medicamentos",
      modulo: "medicamentos",
    },
    {
      title: "Aprendizaje",
      description: "Quiz, completar palabras y el Tutorial para ser médico con casos clínicos",
      icon: "🎓",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/aprendizaje",
      modulo: "aprendizaje",
    },
  ];

  const features = allFeatures.filter((f) => puedeAcceder(user?.type, f.modulo));

  const stats = summary
    ? [
        { valor: summary.medicationCount, etiqueta: "Medicamentos", icono: "💊", color: "from-blue-500 to-cyan-500" },
        { valor: summary.ailmentCount, etiqueta: "Dolencias", icono: "🩺", color: "from-rose-500 to-pink-500" },
        { valor: summary.quizQuestionCount, etiqueta: "Preguntas de quiz", icono: "❓", color: "from-violet-500 to-purple-500" },
        { valor: summary.clinicalCaseCount, etiqueta: "Casos clínicos", icono: "🧑‍⚕️", color: "from-emerald-500 to-teal-500" },
      ]
    : [];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        {/* Hero */}
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-16 text-center text-white shadow-xl">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-14 -right-10 h-56 w-56 rounded-full bg-white/10" aria-hidden="true" />

          <p className="mb-3 text-lg font-semibold opacity-90">
            👋 Hola, {user?.fullName?.split(" ")[0] ?? "bienvenido"}
          </p>
          <h1 className="mb-4 text-5xl font-extrabold">Bienvenido a PHARMLY</h1>
          <p className="mb-8 text-xl opacity-90">
            {saludoTipo[user?.type] ??
              "Tu plataforma integral para consulta y aprendizaje de medicamentos"}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/consulta"
              className="inline-block rounded-xl bg-white px-8 py-3 text-lg font-semibold text-indigo-600 shadow transition hover:bg-gray-100"
            >
              🔍 Comenzar consulta
            </Link>
            {puedeAcceder(user?.type, "aprendizaje") && (
              <Link
                to="/aprendizaje"
                className="inline-block rounded-xl border-2 border-white/70 px-8 py-3 text-lg font-semibold text-white transition hover:bg-white/15"
              >
                🎮 Ir a los minijuegos
              </Link>
            )}
          </div>
        </div>

        {/* Estadísticas en vivo */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-600">{error}</div>
        )}
        {loading && (
          <p className="mb-6 text-center text-slate-500">Cargando resumen…</p>
        )}
        {!loading && !error && summary && (
          <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.etiqueta}
                className={`rounded-2xl bg-gradient-to-br ${s.color} p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="text-3xl" aria-hidden="true">{s.icono}</div>
                <p className="mt-2 text-3xl font-extrabold">{s.valor}</p>
                <p className="text-sm font-medium opacity-90">{s.etiqueta}</p>
              </div>
            ))}
          </div>
        )}

        {/* Funcionalidades */}
        <h2 className="mb-2 text-center text-3xl font-bold text-slate-900">
          Explora Nuestras Funcionalidades
        </h2>
        <p className="mb-10 text-center text-slate-500">
          Todo lo que puedes hacer con tu cuenta, en un solo lugar.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex-1 p-6 text-center">
                <div
                  className={`${feature.bgColor} mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl text-4xl ${feature.color}`}
                >
                  {feature.icon}
                </div>

                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>

              <div className="p-4 text-center">
                <Link
                  to={feature.link}
                  className="inline-block rounded-lg border border-blue-600 px-6 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                  Explorar
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ¿Por qué PHARMLY? */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 p-8 shadow-inner">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            ¿Por qué elegir PHARMLY?
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                📚 Base de Datos Completa
              </h3>
              <p className="text-sm text-slate-600">
                Fichas detalladas de medicamentos con usos, dosis, precauciones,
                contraindicaciones e interacciones, además de dolencias con síntomas
                y consejos.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                🎮 Aprende Jugando
              </h3>
              <p className="text-sm text-slate-600">
                Quiz con preguntas aleatorias, completar palabras y casos clínicos
                interactivos donde tú eres el médico.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                ⚡ Consulta Instantánea
              </h3>
              <p className="text-sm text-slate-600">
                Busca por medicamento o dolencia y obtén al instante significado,
                usos frecuentes y recomendaciones prácticas.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            ⚕️ La información de PHARMLY es educativa y no reemplaza la consulta con
            un profesional de la salud.
          </p>
        </div>
      </section>
    </main>
  );
}
