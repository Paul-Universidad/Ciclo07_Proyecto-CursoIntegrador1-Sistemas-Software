import { Link } from "react-router-dom";
import { useHomeSummary } from "../hooks/useHomeSummary.js";

export function Home() {
  const { summary, error, loading } = useHomeSummary();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <section className="max-w-5xl mx-auto bg-white/80 rounded-2xl shadow-xl border border-blue-100 p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-3 text-slate-500">
            🔍 Paracetamol
          </div>

          <span>💊</span>
          <span>☁️</span>
          <span>⚙️</span>
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <aside className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <h3 className="text-slate-400 font-semibold px-6 py-5 border-b">
              Medicamentos
            </h3>

            {["Paracetamol", "Ibuprofeno", "Ambroxol", "Amoxicilina", "Omeprazol"].map(
              (item, index) => (
                <Link
                  key={item}
                  to="/consulta"
                  className={`flex items-center gap-3 px-6 py-4 text-sm ${
                    index === 0
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-500 hover:bg-blue-50"
                  }`}
                >
                  <span>💊</span>
                  {item}
                </Link>
              )
            )}
          </aside>

          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">
              Paracetamol
            </h1>

            <InfoBlock
              title="Uso"
              icon="✅"
              color="text-green-600"
              bg="bg-slate-50"
              text="Alivio del dolor y reducción de fiebre"
            />

            <InfoBlock
              title="Dosis"
              icon="💊"
              color="text-blue-600"
              bg="bg-blue-50"
              text="500 mg - 1000 mg cada 4-6 horas, según indicación médica"
            />

            <InfoBlock
              title="Contraindicaciones"
              icon="⚠️"
              color="text-red-500"
              bg="bg-red-50"
              text="No combinar con otros medicamentos que contengan paracetamol"
            />

            <InfoBlock
              title="Efectos secundarios"
              icon="⚠️"
              color="text-red-500"
              bg="bg-red-50"
              text="Puede causar daño hepático en dosis altas."
            />

            <div className="mt-6 flex gap-3">
              <Link
                to="/panel"
                className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700"
              >
                Ir al panel principal
              </Link>

              <Link
                to="/consulta"
                className="bg-blue-50 text-blue-700 px-5 py-3 rounded-xl font-semibold hover:bg-blue-100"
              >
                Buscar medicamento
              </Link>
            </div>

            <div className="mt-5 text-sm text-slate-500">
              {loading && <span>Cargando resumen…</span>}
              {error && <p className="text-red-600">{error}</p>}
              {!loading && !error && summary && (
                <span>
                  Contenido de demostración:{" "}
                  <strong>{summary.medicationCount}</strong> fichas y{" "}
                  <strong>{summary.quizQuestionCount}</strong> preguntas.
                </span>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, icon, color, bg, text }) {
  return (
    <div className="mb-5">
      <h2 className="text-blue-800 font-bold mb-2">{title}</h2>
      <div className={`${bg} rounded-xl px-5 py-4 flex items-center gap-3`}>
        <span className={color}>{icon}</span>
        <p className="text-blue-800 text-sm">{text}</p>
      </div>
    </div>
  );
}