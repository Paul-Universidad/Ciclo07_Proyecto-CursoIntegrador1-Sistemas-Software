import { useEffect, useState } from 'react';
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';
import { createMedication, fetchMedication, updateMedication } from '../api/medicamentosApi.js';

const empty = {
  name: '',
  genericName: '',
  description: '',
  commonUsage: '',
  precautions: '',
  doseGuidance: '',
  sideEffects: '',
  contraindications: '',
  interactions: '',
  administrationRoute: '',
  requiresPrescription: false,
  category: '',
  presentation: '',
  price: '',
};

const categoriasFormulario = [
  { value: '', label: '— Sin categoría —' },
  { value: 'analgesicos', label: 'Analgésicos' },
  { value: 'antibioticos', label: 'Antibióticos' },
  { value: 'antiinflamatorios', label: 'Antiinflamatorios' },
  { value: 'cardiovasculares', label: 'Cardiovasculares' },
  { value: 'neurologicos', label: 'Neurológicos' },
  { value: 'dermatologicos', label: 'Dermatológicos' },
  { value: 'antialergicos', label: 'Antialérgicos' },
  { value: 'gastrointestinales', label: 'Gastrointestinales' },
  { value: 'endocrinos', label: 'Endocrinos' },
  { value: 'respiratorios', label: 'Respiratorios' },
  { value: 'suplementos', label: 'Suplementos y vitaminas' },
];

const inputClass =
  'w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';
const labelClass = 'mb-1 block text-sm font-semibold text-slate-700';

export function MedicamentoForm() {
  const isNew = !!useMatch('/medicamentos/nuevo');
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) {
      setForm(empty);
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetchMedication(id)
      .then((m) => {
        if (cancelled) return;
        setForm({
          name: m.name ?? '',
          genericName: m.genericName ?? '',
          description: m.description ?? '',
          commonUsage: m.commonUsage ?? '',
          precautions: m.precautions ?? '',
          doseGuidance: m.doseGuidance ?? '',
          sideEffects: m.sideEffects ?? '',
          contraindications: m.contraindications ?? '',
          interactions: m.interactions ?? '',
          administrationRoute: m.administrationRoute ?? '',
          requiresPrescription: m.requiresPrescription ?? false,
          category: m.category ?? '',
          presentation: m.presentation ?? '',
          price: m.price != null ? String(m.price) : '',
        });
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
  }, [isNew, id]);

  function onChange(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      if (isNew) {
        const created = await createMedication(form);
        navigate(`/medicamentos/${created.id}`);
      } else {
        await updateMedication(id, form);
        navigate(`/medicamentos/${id}`);
      }
    } catch (err) {
      setError(err?.response?.data?.error ?? err.message);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-slate-500">Cargando…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <section className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold">
          {isNew ? '💊 Nuevo medicamento' : '✏️ Editar medicamento'}
        </h1>
        <p className="mt-1 text-blue-100">
          Completa la ficha con la información más detallada posible.
        </p>
      </section>

      {error && (
        <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Datos generales */}
        <section className="rounded-2xl border-l-4 border-l-blue-500 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            📋 Datos generales
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Nombre *
              </label>
              <input
                id="name"
                className={inputClass}
                value={form.name}
                onChange={onChange('name')}
                required
              />
            </div>

            <div>
              <label htmlFor="genericName" className={labelClass}>
                Nombre genérico
              </label>
              <input
                id="genericName"
                className={inputClass}
                value={form.genericName}
                onChange={onChange('genericName')}
              />
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>
                Categoría
              </label>
              <select
                id="category"
                className={inputClass}
                value={form.category}
                onChange={onChange('category')}
              >
                {categoriasFormulario.map((c) => (
                  <option key={c.value || 'none'} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="presentation" className={labelClass}>
                Presentación
              </label>
              <input
                id="presentation"
                className={inputClass}
                value={form.presentation}
                onChange={onChange('presentation')}
                placeholder="Ej.: Comprimidos 500 mg"
              />
            </div>

            <div>
              <label htmlFor="administrationRoute" className={labelClass}>
                Vía de administración
              </label>
              <input
                id="administrationRoute"
                className={inputClass}
                value={form.administrationRoute}
                onChange={onChange('administrationRoute')}
                placeholder="Ej.: Oral, Inhalatoria, Tópica"
              />
            </div>

            <div>
              <label htmlFor="price" className={labelClass}>
                Precio (S/)
              </label>
              <input
                id="price"
                type="text"
                inputMode="decimal"
                className={inputClass}
                value={form.price}
                onChange={onChange('price')}
                placeholder="Ej.: 12.50"
              />
            </div>
          </div>

          <label
            htmlFor="requiresPrescription"
            className="mt-4 flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
          >
            <input
              id="requiresPrescription"
              type="checkbox"
              className="h-4 w-4 accent-amber-600"
              checked={form.requiresPrescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, requiresPrescription: e.target.checked }))
              }
            />
            <span className="text-sm font-semibold text-amber-800">
              ⚠ Requiere receta médica
            </span>
          </label>
        </section>

        {/* Información clínica */}
        <section className="rounded-2xl border-l-4 border-l-green-500 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            🎯 Uso e indicaciones
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="description" className={labelClass}>
                Descripción
              </label>
              <textarea
                id="description"
                className={inputClass}
                value={form.description}
                onChange={onChange('description')}
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="commonUsage" className={labelClass}>
                Uso habitual
              </label>
              <textarea
                id="commonUsage"
                className={inputClass}
                value={form.commonUsage}
                onChange={onChange('commonUsage')}
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="doseGuidance" className={labelClass}>
                Orientación de dosis
              </label>
              <textarea
                id="doseGuidance"
                className={inputClass}
                value={form.doseGuidance}
                onChange={onChange('doseGuidance')}
                rows={2}
              />
            </div>
          </div>
        </section>

        {/* Seguridad */}
        <section className="rounded-2xl border-l-4 border-l-red-500 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            ⚠️ Seguridad
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="precautions" className={labelClass}>
                Precauciones
              </label>
              <textarea
                id="precautions"
                className={inputClass}
                value={form.precautions}
                onChange={onChange('precautions')}
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="contraindications" className={labelClass}>
                Contraindicaciones
              </label>
              <textarea
                id="contraindications"
                className={inputClass}
                value={form.contraindications}
                onChange={onChange('contraindications')}
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="interactions" className={labelClass}>
                Interacciones
              </label>
              <textarea
                id="interactions"
                className={inputClass}
                value={form.interactions}
                onChange={onChange('interactions')}
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="sideEffects" className={labelClass}>
                Efectos adversos
              </label>
              <textarea
                id="sideEffects"
                className={inputClass}
                value={form.sideEffects}
                onChange={onChange('sideEffects')}
                rows={3}
              />
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            💾 Guardar
          </button>
          <Link
            to={isNew ? '/medicamentos' : `/medicamentos/${id}`}
            className="rounded-xl bg-white px-8 py-3 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
