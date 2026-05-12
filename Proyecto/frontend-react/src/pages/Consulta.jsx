import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchMedications } from '../api/medicationApi.js';

export function Consulta() {
  const [params, setParams] = useSearchParams();
  const qParam = params.get('q') ?? '';
  const [query, setQuery] = useState(qParam);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  useEffect(() => {
    if (!qParam.trim()) {
      setResults([]);
      setError(null);
      return;
    }
    let cancelled = false;
    searchMedications(qParam.trim())
      .then((data) => {
        if (!cancelled) setResults(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.error ?? e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [qParam]);

  function onSubmit(e) {
    e.preventDefault();
    const t = query.trim();
    if (!t) {
      setParams({});
      return;
    }
    setParams({ q: t });
  }

  return (
    <main className="apf-shell apf-shell-wide">
      <h1 className="apf-page-title">Consulta de medicamentos</h1>
      <p className="muted">Busca por nombre comercial o denominación genérica.</p>
      <form className="apf-form" onSubmit={onSubmit} style={{ maxWidth: '32rem' }}>
        <label htmlFor="q">Término de búsqueda</label>
        <input
          id="q"
          name="q"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej.: ibuprofeno, paracetamol…"
        />
        <button type="submit" className="apf-btn apf-btn-primary" style={{ marginTop: '0.75rem' }}>
          Buscar
        </button>
      </form>
      {error && <p className="apf-error">{error}</p>}
      {qParam.trim() && (
        <>
          <h2 className="apf-page-title" style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
            Resultados
          </h2>
          {results.length === 0 && !error && <p className="muted">Sin coincidencias.</p>}
          <ul className="apf-list-plain">
            {results.map((m) => (
              <li key={m.id}>
                <Link to={`/medicamentos/${m.id}`}>{m.name}</Link>
                {m.genericName && <span className="muted"> — {m.genericName}</span>}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
