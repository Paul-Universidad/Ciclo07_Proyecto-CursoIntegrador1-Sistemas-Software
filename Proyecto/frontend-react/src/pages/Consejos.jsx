import { useState } from 'react';
import { fetchAdvice } from '../api/adviceApi.js';

function triageClass(code) {
  if (code === 'rojo') return 'apf-triage apf-triage--rojo';
  if (code === 'amarillo') return 'apf-triage apf-triage--amarillo';
  return 'apf-triage apf-triage--verde';
}

export function Consejos() {
  const [topic, setTopic] = useState('');
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setAdvice(null);
    const t = topic.trim();
    if (!t) {
      setError('Describe brevemente tus síntomas o tu duda.');
      return;
    }
    try {
      const data = await fetchAdvice(t);
      setAdvice(data);
    } catch (err) {
      setError(err?.response?.data?.error ?? err.message);
    }
  }

  return (
    <main className="apf-shell apf-shell-wide">
      <h1 className="apf-page-title">Consejos educativos</h1>
      <p className="muted">Información orientativa; no sustituye la valoración profesional.</p>
      <form className="apf-form" onSubmit={onSubmit} style={{ maxWidth: '40rem' }}>
        <label htmlFor="topic">Describe tus síntomas o tu duda</label>
        <textarea id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} rows={4} />
        <button type="submit" className="apf-btn apf-btn-primary" style={{ marginTop: '0.75rem' }}>
          Obtener orientación
        </button>
      </form>
      {error && <p className="apf-error">{error}</p>}
      {advice && (
        <div className={triageClass(advice.levelCode)}>
          <div className="apf-triage-label">{advice.levelTitle}</div>
          <p>
            <strong>Tema:</strong> {advice.topic}
          </p>
          <p>{advice.message}</p>
        </div>
      )}
    </main>
  );
}
