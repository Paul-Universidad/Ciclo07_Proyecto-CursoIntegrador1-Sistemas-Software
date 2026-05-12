import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="apf-shell">
      <h1 className="apf-page-title">Página no encontrada</h1>
      <p className="muted">La ruta no existe en esta aplicación.</p>
      <Link className="apf-btn apf-btn-primary" to="/inicio">
        Volver al inicio
      </Link>
    </main>
  );
}
