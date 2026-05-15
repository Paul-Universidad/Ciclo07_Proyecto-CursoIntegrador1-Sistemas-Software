import { useHomeSummary } from '../hooks/useHomeSummary.js';

export function PanelResumen() {
  const { summary, error, loading } = useHomeSummary();

  const stats = [
    { label: 'Medicamentos Consultados', value: summary?.medicationCount ?? '245', color: 'bg-blue-600' },
    { label: 'Cursos Completados', value: '8', color: 'bg-green-600' },
    { label: 'Guardados', value: '32', color: 'bg-orange-500' },
    { label: 'Progreso General', value: '67%', color: 'bg-purple-600' },
  ];

  const recentActivities = [
    { title: 'Paracetamol', description: 'Consultado hace 2 horas', color: 'bg-blue-600' },
    { title: 'Curso: Antibióticos', description: 'Completado al 85%', color: 'bg-green-600' },
    { title: 'Ibuprofeno', description: 'Agregado a favoritos', color: 'bg-orange-500' },
    { title: 'Artículo: Interacciones', description: 'Leído hace 1 día', color: 'bg-purple-600' },
  ];

  const coursesProgress = [
    { name: 'Fundamentos de Farmacología', progress: 100 },
    { name: 'Antibióticos y Antivirales', progress: 85 },
    { name: 'Analgésicos y Antiinflamatorios', progress: 60 },
    { name: 'Medicamentos Cardiovasculares', progress: 30 },
  ];

  return (
    <main className="min-h-screen border-t-4 border-blue-600 bg-white px-16 py-8">
      <section className="mx-auto max-w-[1410px]">
        <h1 className="text-3xl font-bold text-black">Panel de Control</h1>
        <p className="mt-3 text-sm text-slate-700">
          Resumen de tu actividad y progreso en la plataforma
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-600">{error}</p>
        )}

        {loading && (
          <p className="mt-4 text-slate-600">Cargando resumen del sistema…</p>
        )}

        <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white p-6 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className={`h-11 w-11 rounded-lg ${stat.color}`} />
                <span className="text-3xl font-bold text-black">{stat.value}</span>
              </div>

              <p className="mt-5 text-sm text-slate-700">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-6 text-xl font-bold text-black">
              Actividad Reciente
            </h2>

            <div>
              {recentActivities.map((activity, index) => (
                <div
                  key={activity.title}
                  className={`flex items-center gap-4 py-5 ${
                    index !== recentActivities.length - 1
                      ? 'border-b border-slate-200'
                      : ''
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${activity.color}`} />

                  <div>
                    <p className="font-bold text-black">{activity.title}</p>
                    <p className="mt-1 text-sm text-slate-700">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-6 text-xl font-bold text-black">
              Progreso de Cursos
            </h2>

            <div className="space-y-6">
              {coursesProgress.map((course) => (
                <div key={course.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-black">{course.name}</span>
                    <span className="text-slate-700">{course.progress}%</span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-slate-200">
                    <div
                      className={`h-2 rounded-full ${
                        course.progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-blue-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-black">
            💡 Recomendación del Día
          </h3>

          <p className="text-slate-700">
            Completa el módulo de "Interacciones Medicamentosas" para mejorar tu
            conocimiento sobre cómo diferentes fármacos pueden interactuar entre
            sí. Este tema es fundamental para la práctica segura de la farmacoterapia.
          </p>
        </div>
      </section>
    </main>
  );
}
