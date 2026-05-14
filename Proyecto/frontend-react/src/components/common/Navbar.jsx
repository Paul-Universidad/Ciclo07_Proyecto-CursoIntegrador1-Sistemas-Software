import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/inicio', label: 'Inicio', end: true },
  { to: '/panel', label: 'Panel' },
  { to: '/consulta', label: 'Consulta', pathPrefix: '/consulta' },
  { to: '/medicamentos', label: 'Catalogo', pathPrefix: '/medicamentos' },
  { to: '/repaso', label: 'Aprendizaje' },
  { to: '/consejos', label: 'Consejos' },
];

function navClass(isActive) {
  return `apf-sidebar-link${isActive ? ' apf-nav-active' : ''}`;
}

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <aside className="apf-sidebar" aria-label="Menú principal">
      <div className="apf-sidebar-head">
        <Link className="apf-brand" to="/inicio">
          PHARMLY
          <span>Sistema de consulta y repaso de medicamentos</span>
        </Link>
      </div>
      <nav className="apf-sidebar-nav">
        {links.map(({ to, label, end, pathPrefix }) => (
          <NavLink
            key={to}
            to={to}
            end={!!end}
            className={({ isActive }) =>
              navClass(isActive || (pathPrefix ? pathname.startsWith(pathPrefix) : false))
            }
          >
            <span className="apf-sidebar-ico" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="apf-sidebar-foot">
        <a href="login" target="_blank" rel="noreferrer">
          Salir
        </a>
      </div>
    </aside>
  );
}
