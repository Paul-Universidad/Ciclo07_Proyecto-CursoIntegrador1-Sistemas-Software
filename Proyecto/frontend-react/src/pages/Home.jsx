import { Link } from 'react-router-dom';
import { useHomeSummary } from '../hooks/useHomeSummary.js';

export function Home() {
  const { summary, error, loading } = useHomeSummary();

  return (
    <main className="apf-shell">
      <section className="apf-hero">
        <h1>Sistema de consulta y repaso de medicamentos</h1>
        <p className="apf-lead">
          Información en lenguaje claro para comprender mejor el uso de medicamentos, repasar con preguntas
          interactivas y recibir orientación educativa según lo que indiques.
        </p>
        <div className="apf-hero-actions">
          <Link className="apf-btn apf-btn-primary" to="/panel">
            Ir al panel principal
          </Link>
          <Link className="apf-btn apf-btn-secondary" to="/consulta">
            Buscar medicamento
          </Link>
        </div>
        <div className="apf-hero-meta">
          {loading && <span>Cargando resumen…</span>}
          {error && <p className="apf-error">{error}</p>}
          {!loading && !error && summary && (
            <span>
              Contenido de demostración: <strong>{summary.medicationCount}</strong> fichas de medicamentos y{' '}
              <strong>{summary.quizQuestionCount}</strong> preguntas de aprendizaje.
            </span>
          )}
        </div>
      </section>
    </main>
  );
}
