import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMedications } from '../api/medicationApi.js';

export function Medicamentos() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchMedications()
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.error ?? e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="apf-shell apf-shell-wide">
      <h1 className="apf-page-title">Catálogo de medicamentos</h1>
      <p className="muted">
        <Link className="apf-btn apf-btn-primary" to="/medicamentos/nuevo" style={{ display: 'inline-block' }}>
          Nuevo medicamento
        </Link>
      </p>
      {error && <p className="apf-error">{error}</p>}
      <ul className="apf-list-plain">
        {items.map((m) => (
          <li key={m.id}>
            <Link to={`/medicamentos/${m.id}`}>{m.name}</Link>
            {m.genericName && <span className="muted"> — {m.genericName}</span>}
          </li>
        ))}
      </ul>
    </main>
  );
}
