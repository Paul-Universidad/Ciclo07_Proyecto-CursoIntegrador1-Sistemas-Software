import { useState } from "react";
import { solicitarConsejoPorTema } from "../api/consejosApi.js";

function triageClass(code) {
  if (code === "rojo") return "border-red-400 bg-red-50 text-red-700";
  if (code === "amarillo") return "border-yellow-400 bg-yellow-50 text-yellow-700";
  return "border-green-400 bg-green-50 text-green-700";
}

const consejos = [
  {
    categoria: "Administración de Medicamentos",
    icono: "💊",
    color: "blue",
    items: [
      {
        titulo: "Toma los medicamentos con agua",
        descripcion:
          "A menos que se indique lo contrario, tómalos con un vaso completo de agua.",
      },
      {
        titulo: "Respeta los horarios",
        descripcion:
          "Mantén un horario regular para mejorar la efectividad del tratamiento.",
      },
      {
        titulo: "No partas ni tritures sin consultar",
        descripcion:
          "Algunos medicamentos tienen recubrimientos especiales. Consulta antes.",
      },
    ],
  },
  {
    categoria: "Almacenamiento",
    icono: "✅",
    color: "green",
    items: [
      {
        titulo: "Guarda en lugar fresco y seco",
        descripcion:
          "Evita humedad y calor. El baño no suele ser un buen lugar.",
      },
      {
        titulo: "Mantén en su envase original",
        descripcion:
          "Protege el medicamento y conserva la información importante.",
      },
      {
        titulo: "Fuera del alcance de niños",
        descripcion:
          "Guárdalos en un lugar alto y seguro.",
      },
    ],
  },
  {
    categoria: "Seguridad",
    icono: "⚠️",
    color: "red",
    items: [
      {
        titulo: "Verifica la fecha de caducidad",
        descripcion:
          "Los medicamentos vencidos pueden perder efectividad o ser peligrosos.",
      },
      {
        titulo: "Comunica todas tus medicinas al médico",
        descripcion:
          "Incluye suplementos, vitaminas y medicamentos sin receta.",
      },
      {
        titulo: "No compartas medicamentos",
        descripcion:
          "No tomes ni entregues medicamentos recetados a otras personas.",
      },
    ],
  },
  {
    categoria: "Interacciones",
    icono: "ℹ️",
    color: "yellow",
    items: [
      {
        titulo: "Cuidado con el alcohol",
        descripcion:
          "Puede causar interacciones peligrosas con algunos medicamentos.",
      },
      {
        titulo: "Alimentos y medicamentos",
        descripcion:
          "Algunos se toman con comida y otros con el estómago vacío.",
      },
      {
        titulo: "Suplementos y vitaminas",
        descripcion:
          "También pueden interactuar con medicamentos.",
      },
    ],
  },
];

const preguntasFrecuentes = [
  {
    pregunta: "¿Qué hago si olvido tomar una dosis?",
    respuesta:
      "Tómala cuando lo recuerdes, salvo que esté cerca de la siguiente dosis. Nunca dupliques la dosis.",
  },
  {
    pregunta: "¿Puedo conducir mientras tomo medicamentos?",
    respuesta:
      "Algunos medicamentos causan sueño o mareos. Revisa el prospecto o consulta con un profesional.",
  },
  {
    pregunta: "¿Cómo sé si tengo una reacción alérgica?",
    respuesta:
      "Erupción, picazón, hinchazón o dificultad para respirar pueden ser señales de alarma. Busca atención médica.",
  },
  {
    pregunta: "¿Es seguro tomar medicamentos durante el embarazo?",
    respuesta:
      "Consulta siempre con tu médico antes de tomar cualquier medicamento durante embarazo o lactancia.",
  },
];

function colorClasses(color) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    red: "bg-red-50 text-red-600 border-red-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  };

  return colors[color] || colors.blue;
}

export function Consejos() {
  const [topic, setTopic] = useState("");
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setAdvice(null);

    const t = topic.trim();

    if (!t) {
      setError("Describe brevemente tus síntomas o tu duda.");
      return;
    }

    try {
      const data = await solicitarConsejoPorTema(t);
      setAdvice(data);
    } catch (err) {
      setError(err?.response?.data?.error ?? err.message);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-20">
      <section className="w-full max-w-5xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-2">
            <span className="text-blue-500">Cons</span>
            <span className="text-slate-900">ejos</span>
          </h1>

          <p className="text-blue-600 mb-8">
            Información orientativa, no sustituye la valoración profesional.
          </p>

          <form
            onSubmit={onSubmit}
            className="max-w-xl mx-auto bg-white border-2 border-blue-400 rounded-2xl shadow-lg shadow-blue-100 p-4 flex items-end gap-3"
          >
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Describe tus síntomas o consulta médica..."
              rows={3}
              className="flex-1 border-none resize-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-xs border-none text-blue-500 hover:text-blue-700"
              >
                Filtros ⚙
              </button>

              <button
                type="submit"
                className="w-9 h-9 border-none rounded-lg bg-blue-400 hover:bg-blue-500 text-white grid place-items-center"
              >
                🔍
              </button>
            </div>
          </form>

          {error && <p className="mt-6 text-red-600">{error}</p>}

          {advice && (
            <div
              className={`max-w-xl mx-auto mt-6 border rounded-2xl p-5 text-left ${triageClass(
                advice.levelCode
              )}`}
            >
              <div className="font-bold mb-2">{advice.levelTitle}</div>
              <p>
                <strong>Tema:</strong> {advice.topic}
              </p>
              <p>{advice.message}</p>
            </div>
          )}
        </div>

        <div className="mt-12 bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            💡 Consejos esenciales
          </h2>
          <p className="text-slate-600">
            Recomendaciones para usar medicamentos de manera segura y efectiva.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {consejos.map((categoria, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl shadow-md border border-slate-100 p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-12 h-12 rounded-xl grid place-items-center border ${colorClasses(
                    categoria.color
                  )}`}
                >
                  <span className="text-2xl">{categoria.icono}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-800">
                  {categoria.categoria}
                </h3>
              </div>

              <div className="space-y-4">
                {categoria.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border-b border-slate-100 last:border-b-0 pb-3 last:pb-0"
                  >
                    <h4 className="font-semibold text-blue-600">
                      ✓ {item.titulo}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {item.descripcion}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            Preguntas frecuentes
          </h2>

          <div className="space-y-3">
            {preguntasFrecuentes.map((faq, index) => (
              <details
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-4"
              >
                <summary className="font-semibold text-slate-800 cursor-pointer">
                  {faq.pregunta}
                </summary>
                <p className="text-sm text-slate-600 mt-3">{faq.respuesta}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex gap-4">
          <span className="text-3xl">⚠️</span>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Recordatorio importante
            </h3>
            <p className="text-slate-700 mt-1">
              Esta información es educativa y no reemplaza la consulta médica.
              Ante dudas sobre tu tratamiento, consulta con un médico o
              farmacéutico. En emergencia, acude a urgencias.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}