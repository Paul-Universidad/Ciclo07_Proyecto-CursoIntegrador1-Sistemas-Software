import { useEffect, useState } from 'react';
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';
import { createMedication, fetchMedication, updateMedication } from '../api/medicationApi.js';

const empty = {
  name: '',
  genericName: '',
  description: '',
  commonUsage: '',
  precautions: '',
  doseGuidance: '',
  sideEffects: '',
};

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
      <main className="apf-shell">
        <p className="muted">Cargando…</p>
      </main>
    );
  }

  return (
    <main className="apf-shell apf-shell-wide">
      <h1 className="apf-page-title">{isNew ? 'Nuevo medicamento' : 'Editar medicamento'}</h1>
      {error && <p className="apf-error">{error}</p>}
      <form className="apf-form" onSubmit={onSubmit} style={{ maxWidth: '40rem' }}>
        <label htmlFor="name">Nombre *</label>
        <input id="name" value={form.name} onChange={onChange('name')} required />
        <label htmlFor="genericName">Nombre genérico</label>
        <input id="genericName" value={form.genericName} onChange={onChange('genericName')} />
        <label htmlFor="description">Descripción</label>
        <textarea id="description" value={form.description} onChange={onChange('description')} rows={4} />
        <label htmlFor="commonUsage">Uso habitual</label>
        <textarea id="commonUsage" value={form.commonUsage} onChange={onChange('commonUsage')} rows={3} />
        <label htmlFor="precautions">Precauciones</label>
        <textarea id="precautions" value={form.precautions} onChange={onChange('precautions')} rows={3} />
        <label htmlFor="doseGuidance">Orientación de dosis</label>
        <textarea id="doseGuidance" value={form.doseGuidance} onChange={onChange('doseGuidance')} rows={2} />
        <label htmlFor="sideEffects">Efectos adversos</label>
        <textarea id="sideEffects" value={form.sideEffects} onChange={onChange('sideEffects')} rows={3} />
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button type="submit" className="apf-btn apf-btn-primary">
            Guardar
          </button>
          <Link className="apf-btn apf-btn-secondary" to={isNew ? '/medicamentos' : `/medicamentos/${id}`}>
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
