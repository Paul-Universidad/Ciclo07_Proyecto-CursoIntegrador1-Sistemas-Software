import { Link } from 'react-router-dom';

const juegos = [
  {
    titulo: 'Quiz de medicina',
    descripcion:
      '10 preguntas aleatorias sobre medicamentos, dolencias y conceptos de farmacología. Marca tus respuestas y guarda para ver tus resultados.',
    icono: '❓',
    link: '/aprendizaje/quiz',
    disponible: true,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    titulo: 'Completar palabras',
    descripcion:
      'Completa las palabras que faltan en párrafos sobre medicamentos y dolencias. Las respuestas correctas se marcan en verde automáticamente.',
    icono: '✏️',
    link: '/aprendizaje/completar',
    disponible: true,
    color: 'from-green-500 to-emerald-600',
  },
  {
    titulo: 'Tutorial para ser médico',
    descripcion:
      'Atiende pacientes virtuales: lee su historia clínica, elige el diagnóstico más probable y justifica tu decisión como un verdadero doctor.',
    icono: '🩺',
    link: '/aprendizaje/casos',
    disponible: true,
    color: 'from-rose-500 to-red-600',
  },
];

export function Aprendizaje() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Módulo de aprendizaje
        </h1>
        <p className="text-slate-600">
          Elige un minijuego y pon a prueba tus conocimientos sobre medicina,
          dolencias y medicamentos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {juegos.map((juego) => {
          const card = (
            <div
              className={`flex h-96 flex-col rounded-2xl border border-slate-200 bg-white shadow-md transition ${
                juego.disponible
                  ? 'hover:-translate-y-2 hover:shadow-xl cursor-pointer'
                  : 'opacity-70'
              }`}
            >
              <div
                className={`flex h-40 items-center justify-center rounded-t-2xl bg-gradient-to-br ${juego.color}`}
              >
                <span className="text-6xl">{juego.icono}</span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="mb-3 text-xl font-bold text-slate-900">
                  {juego.titulo}
                </h2>
                <p className="flex-1 text-sm text-slate-600">
                  {juego.descripcion}
                </p>

                <span
                  className={`mt-4 inline-block w-fit rounded-full px-4 py-1 text-xs font-semibold ${
                    juego.disponible
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {juego.disponible ? 'Jugar ahora' : 'En desarrollo'}
                </span>
              </div>
            </div>
          );

          return juego.disponible ? (
            <Link key={juego.titulo} to={juego.link} className="block">
              {card}
            </Link>
          ) : (
            <div key={juego.titulo}>{card}</div>
          );
        })}
      </div>
    </main>
  );
}
