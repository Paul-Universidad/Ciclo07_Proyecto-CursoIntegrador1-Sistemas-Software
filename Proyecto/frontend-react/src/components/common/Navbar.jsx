import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { esAdmin, puedeAcceder } from '../../utils/roles.js';

const links = [
  { to: '/inicio', label: 'Inicio', end: true, modulo: 'inicio', icono: '🏠' },
  { to: '/panel', label: 'Panel', modulo: 'panel', icono: '📊' },
  { to: '/consulta', label: 'Busqueda', pathPrefix: '/consulta', modulo: 'consulta', icono: '🔍' },
  { to: '/medicamentos', label: 'Diccionario', pathPrefix: '/medicamentos', modulo: 'medicamentos', icono: '💊' },
  { to: '/aprendizaje', label: 'Aprendizaje', pathPrefix: '/aprendizaje', modulo: 'aprendizaje', icono: '🎓' },
];

const estiloTipo = {
  USUARIO_GENERAL: {
    etiqueta: 'Usuario general',
    clase: 'bg-emerald-400 text-emerald-950',
    icono: '🙂',
  },
  ESTUDIANTE: {
    etiqueta: 'Estudiante',
    clase: 'bg-sky-400 text-sky-950',
    icono: '🎓',
  },
  ADMIN: {
    etiqueta: 'Administrador',
    clase: 'bg-amber-400 text-amber-950',
    icono: '🛡️',
  },
};

function navClass(isActive) {
  return `apf-sidebar-link${isActive ? ' apf-nav-active' : ''}`;
}

export function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const visibleLinks = links.filter((l) => puedeAcceder(user?.type, l.modulo));
  const tipo = estiloTipo[user?.type] ?? {
    etiqueta: user?.type,
    clase: 'bg-white/30 text-white',
    icono: '👤',
  };

  function onLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <aside className="apf-sidebar" aria-label="Menú principal">
      <div className="apf-sidebar-head">
        <Link className="apf-brand" to="/inicio">
          <span className="apf-brand-logo" aria-hidden="true">
            ⚕️
          </span>
          PHARMLY
          <span>Sistema de consulta y repaso de medicamentos</span>
        </Link>
      </div>
      <nav className="apf-sidebar-nav">
        {visibleLinks.map(({ to, label, end, pathPrefix, icono }) => (
          <NavLink
            key={to}
            to={to}
            end={!!end}
            className={({ isActive }) =>
              navClass(isActive || (pathPrefix ? pathname.startsWith(pathPrefix) : false))
            }
          >
            <span className="apf-sidebar-ico" aria-hidden="true">
              {icono}
            </span>
            {label}
          </NavLink>
        ))}

        {esAdmin(user?.type) && (
          <a
            className="apf-sidebar-link"
            href="/h2-console"
            target="_blank"
            rel="noreferrer"
          >
            <span className="apf-sidebar-ico" aria-hidden="true">
              🗄️
            </span>
            H2 Console
          </a>
        )}
      </nav>
      <div className="apf-sidebar-foot">
        {user && (
          <div className="mb-2">
            <p className="m-0 text-sm font-semibold text-white">
              {user.fullName}
            </p>
            <span
              className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold shadow-sm ${tipo.clase}`}
            >
              <span aria-hidden="true">{tipo.icono}</span>
              {tipo.etiqueta}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={onLogout}
          className="w-fit cursor-pointer rounded-lg border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/25"
        >
          ⏻ Salir
        </button>
      </div>
    </aside>
  );
}
