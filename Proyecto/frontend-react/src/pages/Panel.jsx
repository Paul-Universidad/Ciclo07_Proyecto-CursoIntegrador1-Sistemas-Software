import { Link } from 'react-router-dom';
import { useHomeSummary } from '../hooks/useHomeSummary.js';

export function Panel() {
  const { summary, error, loading } = useHomeSummary();

  return (
    <main className="apf-shell apf-shell-wide">
      <h1 className="apf-page-title">Panel principal</h1>
      <p className="muted">Accede a los módulos del prototipo APF.</p>
      {error && <p className="apf-error">{error}</p>}
      {loading && <p className="muted">Cargando…</p>}
      {!loading && summary && (
        <p className="muted">
          {summary.title}: <strong>{summary.medicationCount}</strong> medicamentos,{' '}
          <strong>{summary.quizQuestionCount}</strong> preguntas. {summary.hint}
        </p>
      )}
      <ul className="apf-list-plain" style={{ maxWidth: '36rem' }}>
        <li>
          <Link to="/consulta">Consulta y fichas de medicamentos</Link>
        </li>
        <li>
          <Link to="/medicamentos">Catálogo (listado y edición)</Link>
        </li>
        <li>
          <Link to="/repaso">Aprendizaje — repaso interactivo</Link>
        </li>
        <li>
          <Link to="/consejos">Consejos educativos</Link>
        </li>
      </ul>
    </main>
  );
}
