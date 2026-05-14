import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteMedication, fetchMedication } from '../api/medicationApi.js';

export function MedicamentoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    if (!window.confirm('¿Eliminar este medicamento del catálogo?')) return;
    try {
      await deleteMedication(id);
      navigate('/medicamentos');
    } catch (e) {
      setError(e?.response?.data?.error ?? e.message);
    }
  }

  if (error) {
    return (
      <main className="apf-shell">
        <p className="apf-error">{error}</p>
        <Link to="/medicamentos">Volver al catálogo</Link>
      </main>
    );
  }

  if (!m) {
    return (
      <main className="apf-shell">
        <p className="muted">Cargando…</p>
      </main>
    );
  }

  return (
    <main className="apf-shell apf-shell-wide">
      <h1 className="apf-page-title">{m.name}</h1>
      <p className="muted">{m.genericName}</p>
      <p style={{ marginTop: '1rem' }}>
        <Link className="apf-btn apf-btn-secondary" to={`/medicamentos/${id}/editar`}>
          Editar
        </Link>{' '}
        <button type="button" className="apf-btn apf-btn-secondary" onClick={onDelete}>
          Eliminar
        </button>{' '}
        <Link className="apf-btn apf-btn-primary" to="/medicamentos">
          Volver
        </Link>
      </p>
      <div className="apf-detail-grid" style={{ marginTop: '1.25rem' }}>
        <section>
          <h2 className="apf-page-title" style={{ fontSize: '1rem' }}>
            Descripción
          </h2>
          <p>{m.description ?? '—'}</p>
        </section>
        <section>
          <h2 className="apf-page-title" style={{ fontSize: '1rem' }}>
            Uso habitual
          </h2>
          <p>{m.commonUsage ?? '—'}</p>
        </section>
        <section>
          <h2 className="apf-page-title" style={{ fontSize: '1rem' }}>
            Precauciones
          </h2>
          <p>{m.precautions ?? '—'}</p>
        </section>
        <section>
          <h2 className="apf-page-title" style={{ fontSize: '1rem' }}>
            Dosis
          </h2>
          <p>{m.doseGuidance ?? '—'}</p>
        </section>
        <section style={{ gridColumn: '1 / -1' }}>
          <h2 className="apf-page-title" style={{ fontSize: '1rem' }}>
            Efectos adversos
          </h2>
          <p>{m.sideEffects ?? '—'}</p>
        </section>
      </div>
    </main>
  );
}
