import { Link } from "react-router-dom";
import { useHomeSummary } from "../hooks/useHomeSummary.js";

export function InicioPage() {
  const { summary, error, loading } = useHomeSummary();

  const features = [
    {
      title: "Panel de Control",
      description: "Accede a tu dashboard personalizado con estadísticas y accesos rápidos",
      icon: "📊",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/panel",
    },
    {
      title: "Consulta Rápida",
      description: "Busca información detallada sobre cualquier medicamento al instante",
      icon: "🔍",
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/consulta",
    },
    {
      title: "Catálogo Completo",
      description: "Explora nuestra base de datos completa de medicamentos clasificados",
      icon: "💊",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      link: "/medicamentos",
    },
    {
      title: "Aprendizaje",
      description: "Cursos, módulos educativos y evaluaciones sobre farmacología",
      icon: "🎓",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/aprendizaje",
    },
    {
      title: "Consejos de Salud",
      description: "Recomendaciones y mejores prácticas para el uso de medicamentos",
      icon: "💡",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      link: "/consejos",
    },
    {
      title: "Tendencias",
      description: "Mantente actualizado con las últimas novedades farmacéuticas",
      icon: "📈",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      link: "/panel",
    },
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-16 text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">
            Bienvenido a PHARMLY
          </h1>

          <p className="mb-8 text-xl opacity-90">
            Tu plataforma integral para consulta y aprendizaje de medicamentos
          </p>

          <Link
            to="/consulta"
            className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-indigo-600 transition hover:bg-gray-100"
          >
            Comenzar Consulta
          </Link>
        </div>

        <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
          Explora Nuestras Funcionalidades
        </h2>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {loading && (
          <p className="mb-6 text-center text-slate-500">
            Cargando resumen…
          </p>
        )}

        {!loading && !error && summary && (
          <p className="mb-8 text-center text-sm text-slate-500">
            Actualmente hay <strong>{summary.medicationCount}</strong> fichas y{" "}
            <strong>{summary.quizQuestionCount}</strong> preguntas disponibles.
          </p>
        )}

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-xl bg-white shadow-md transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
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

                <p className="text-sm text-slate-600">
                  {feature.description}
                </p>
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

        <div className="rounded-xl bg-slate-50 p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            ¿Por qué elegir PHARMLY?
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                📚 Base de Datos Completa
              </h3>
              <p className="text-sm text-slate-600">
                Accede a medicamentos con información detallada y organizada.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                🎓 Educación Continua
              </h3>
              <p className="text-sm text-slate-600">
                Aprende con módulos educativos y evaluaciones sobre farmacología.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                ⚡ Consulta Instantánea
              </h3>
              <p className="text-sm text-slate-600">
                Encuentra la información que necesitas en segundos con el buscador.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
