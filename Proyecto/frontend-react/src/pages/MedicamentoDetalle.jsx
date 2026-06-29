import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteMedication, fetchMedication } from '../api/medicamentosApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import { esAdmin } from '../utils/roles.js';

const etiquetasCategoria = {
  analgesicos: 'Analgésicos',
  antibioticos: 'Antibióticos',
  antiinflamatorios: 'Antiinflamatorios',
  cardiovasculares: 'Cardiovasculares',
  neurologicos: 'Neurológicos',
  dermatologicos: 'Dermatológicos',
  antialergicos: 'Antialérgicos',
  gastrointestinales: 'Gastrointestinales',
  endocrinos: 'Endocrinos',
  respiratorios: 'Respiratorios',
  suplementos: 'Suplementos y vitaminas',
};

export function MedicamentoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [m, setM] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchMedication(id)
      .then((data) => {
        if (!cancelled) setM(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.error ?? e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function onDelete() {
    if (!window.confirm('¿Eliminar este medicamento del diccionario?')) return;
    try {
      await deleteMedication(id);
      navigate('/medicamentos');
    } catch (e) {
      setError(e?.response?.data?.error ?? e.message);
    }
  }

  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </p>
        <Link
          to="/medicamentos"
          className="font-semibold text-blue-600 hover:underline"
        >
          ← Volver al diccionario
        </Link>
      </main>
    );
  }

  if (!m) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-slate-500">Cargando…</p>
      </main>
    );
  }

  const secciones = [
    {
      titulo: 'Descripción',
      icono: '📋',
      texto: m.description,
      borde: 'border-l-blue-500',
      fondoIcono: 'bg-blue-100',
    },
    {
      titulo: 'Uso habitual',
      icono: '🎯',
      texto: m.commonUsage,
      borde: 'border-l-green-500',
      fondoIcono: 'bg-green-100',
    },
    {
      titulo: 'Orientación de dosis',
      icono: '🧪',
      texto: m.doseGuidance,
      borde: 'border-l-cyan-500',
      fondoIcono: 'bg-cyan-100',
    },
    {
      titulo: 'Precauciones',
      icono: '⚠️',
      texto: m.precautions,
      borde: 'border-l-amber-500',
      fondoIcono: 'bg-amber-100',
    },
    {
      titulo: 'Contraindicaciones',
      icono: '🚫',
      texto: m.contraindications,
      borde: 'border-l-red-500',
      fondoIcono: 'bg-red-100',
    },
    {
      titulo: 'Interacciones',
      icono: '🔄',
      texto: m.interactions,
      borde: 'border-l-purple-500',
      fondoIcono: 'bg-purple-100',
    },
    {
      titulo: 'Efectos adversos',
      icono: '🩺',
      texto: m.sideEffects,
      borde: 'border-l-rose-500',
      fondoIcono: 'bg-rose-100',
      ancho: true,
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      {/* Hero con gradiente */}
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
        <div className="p-8 text-white">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-5xl backdrop-blur">
              💊
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-extrabold">{m.name}</h1>
              {m.genericName && (
                <p className="mt-1 text-lg text-blue-100">{m.genericName}</p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {m.category && (
                  <span className="rounded-full bg-white/25 px-4 py-1 text-sm font-semibold backdrop-blur">
                    🏷 {etiquetasCategoria[m.category] ?? m.category}
                  </span>
                )}
                {m.presentation && (
                  <span className="rounded-full bg-white/25 px-4 py-1 text-sm font-semibold backdrop-blur">
                    📦 {m.presentation}
                  </span>
                )}
                {m.administrationRoute && (
                  <span className="rounded-full bg-white/25 px-4 py-1 text-sm font-semibold backdrop-blur">
                    💉 Vía {m.administrationRoute}
                  </span>
                )}
                {m.price != null && (
                  <span className="rounded-full bg-white/25 px-4 py-1 text-sm font-semibold backdrop-blur">
                    💰 S/ {m.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Franja de receta */}
        <div
          className={`px-8 py-3 text-sm font-bold ${
            m.requiresPrescription
              ? 'bg-amber-400 text-amber-950'
              : 'bg-emerald-400 text-emerald-950'
          }`}
        >
          {m.requiresPrescription
            ? '⚠ Este medicamento requiere receta médica'
            : '✓ Venta libre — no requiere receta médica'}
        </div>
      </section>

      {/* Acciones */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          to="/medicamentos"
          className="rounded-xl bg-white px-5 py-2.5 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          ← Volver
        </Link>

        {esAdmin(user?.type) && (
          <>
            <Link
              to={`/medicamentos/${id}/editar`}
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              ✏️ Editar
            </Link>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-xl bg-red-50 px-5 py-2.5 font-semibold text-red-600 shadow-sm ring-1 ring-red-200 transition hover:bg-red-100"
            >
              🗑 Eliminar
            </button>
          </>
        )}
      </div>

      {/* Secciones de información */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {secciones.map((s) => (
          <section
            key={s.titulo}
            className={`rounded-2xl border-l-4 bg-white p-6 shadow-md transition hover:shadow-lg ${s.borde} ${
              s.ancho ? 'md:col-span-2' : ''
            }`}
          >
            <div className="mb-3 flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${s.fondoIcono}`}
              >
                {s.icono}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{s.titulo}</h2>
            </div>
            <p className="leading-relaxed text-slate-600">{s.texto ?? '—'}</p>
          </section>
        ))}
      </div>

      {/* Nota educativa */}
      <p className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-4 text-sm text-blue-800">
        ℹ️ Esta información es educativa y no reemplaza la indicación de un
        médico o químico farmacéutico. Ante cualquier duda, consulta a un
        profesional de salud.
      </p>
    </main>
  );
}
