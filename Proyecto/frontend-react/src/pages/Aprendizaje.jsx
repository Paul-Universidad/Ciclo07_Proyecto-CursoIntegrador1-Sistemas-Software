import { useState } from "react";

export function Aprendizaje() {
  const [selection, setSelection] = useState({});
  const [feedback, setFeedback] = useState({});

  const questions = [
    {
      id: 1,
      prompt: "¿Para qué se utiliza principalmente el Paracetamol?",
      options: [
        { id: "a", text: "Para tratar dolor y fiebre", correct: true },
        { id: "b", text: "Para tratar infecciones bacterianas", correct: false },
        { id: "c", text: "Para controlar la presión arterial", correct: false },
      ],
      explanation:
        "El Paracetamol se usa como analgésico y antipirético, es decir, ayuda con el dolor y la fiebre.",
    },
    {
      id: 2,
      prompt: "¿Qué tipo de medicamento es la Amoxicilina?",
      options: [
        { id: "a", text: "Antiinflamatorio", correct: false },
        { id: "b", text: "Antibiótico", correct: true },
        { id: "c", text: "Antihipertensivo", correct: false },
      ],
      explanation:
        "La Amoxicilina es un antibiótico usado para tratar infecciones bacterianas.",
    },
    {
      id: 3,
      prompt: "¿Cuál es una presentación común del Ibuprofeno?",
      options: [
        { id: "a", text: "Comprimidos 400mg", correct: true },
        { id: "b", text: "Crema 1%", correct: false },
        { id: "c", text: "Jarabe de insulina", correct: false },
      ],
      explanation:
        "El Ibuprofeno suele encontrarse en comprimidos de 400mg, aunque existen otras presentaciones.",
    },
  ];

  function onVerify(questionId) {
    const optionId = selection[questionId];

    if (!optionId) {
      setFeedback((f) => ({
        ...f,
        [questionId]: { error: "Elige una opción." },
      }));
      return;
    }

    const question = questions.find((q) => q.id === questionId);
    const option = question.options.find((o) => o.id === optionId);

    setFeedback((f) => ({
      ...f,
      [questionId]: {
        correct: option.correct,
        explanation: question.explanation,
      },
    }));
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Módulo de aprendizaje
        </h1>
        <p className="text-slate-600">
          Responde las preguntas y comprueba tu comprensión.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const currentFeedback = feedback[q.id];

          return (
            <section
              key={q.id}
              className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Pregunta {idx + 1} de {questions.length}
                </h2>

                <span className="w-fit bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                  Aprendizaje
                </span>
              </div>

              <p className="text-slate-700 font-medium mb-5">
                {q.prompt}
              </p>

              {currentFeedback?.error && (
                <p className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm">
                  {currentFeedback.error}
                </p>
              )}

              {currentFeedback?.explanation != null && (
                <p
                  className={`rounded-lg px-4 py-3 mb-4 text-sm border ${
                    currentFeedback.correct
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {currentFeedback.correct
                    ? "✓ Correcto. "
                    : "✗ Incorrecto. "}
                  {currentFeedback.explanation}
                </p>
              )}

              <div className="space-y-3">
                {q.options.map((o) => (
                  <label
                    key={o.id}
                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition ${
                      selection[q.id] === o.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={selection[q.id] === o.id}
                      onChange={() =>
                        setSelection((s) => ({
                          ...s,
                          [q.id]: o.id,
                        }))
                      }
                      className="w-4 h-4 accent-blue-600"
                    />

                    <span className="text-sm text-slate-700">
                      {o.text}
                    </span>
                  </label>
                ))}

                <button
                  type="button"
                  onClick={() => onVerify(q.id)}
                  className="mt-3 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Comprobar respuesta
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
