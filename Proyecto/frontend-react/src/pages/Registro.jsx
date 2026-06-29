import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../api/usuariosApi.js';
import { useAuth } from '../context/AuthContext.jsx';

const tiposCuenta = [
  {
    value: 'USUARIO_GENERAL',
    titulo: 'Usuario general',
    icono: '🙂',
    detalle: 'Consulta el diccionario y la búsqueda de medicamentos y dolencias.',
  },
  {
    value: 'ESTUDIANTE',
    titulo: 'Estudiante',
    icono: '🎓',
    detalle: 'Incluye además el panel y los minijuegos del módulo de aprendizaje.',
  },
];

const inputClass =
  'w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

export function Registro() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('USUARIO_GENERAL');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/inicio" replace />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !username.trim() || !password) {
      setError('Completa tu nombre, usuario y contraseña.');
      return;
    }
    if (username.trim().length < 3) {
      setError('El usuario debe tener al menos 3 caracteres.');
      return;
    }
    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (password !== confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const data = await registrarUsuario({
        username: username.trim(),
        password,
        fullName: fullName.trim(),
        type,
        email: email.trim() || null,
      });
      login(data);
      navigate('/inicio', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.error ?? 'No se pudo crear la cuenta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full flex-1 flex items-center justify-center bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-4 py-10 overflow-y-auto">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900">Crear cuenta</h1>
            <p className="mt-2 text-sm text-slate-500">
              Únete a PHARMLY para consultar y aprender sobre medicamentos
            </p>
          </div>

          {error && (
            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-semibold text-slate-700">
                Nombre completo
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej.: Ana Pérez"
                autoComplete="name"
                className={inputClass}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="username" className="mb-1 block text-sm font-semibold text-slate-700">
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej.: anaperez"
                  autoComplete="username"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
                  Correo (opcional)
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ana@correo.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="confirmar" className="mb-1 block text-sm font-semibold text-slate-700">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmar"
                  type="password"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={inputClass}
                />
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 block text-sm font-semibold text-slate-700">
                Tipo de cuenta
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {tiposCuenta.map((t) => (
                  <label
                    key={t.value}
                    className={`flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition ${
                      type === t.value
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-slate-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tipo"
                      value={t.value}
                      checked={type === t.value}
                      onChange={() => setType(t.value)}
                      className="sr-only"
                    />
                    <span className="text-2xl" aria-hidden="true">
                      {t.icono}
                    </span>
                    <span className="font-bold text-slate-900">{t.titulo}</span>
                    <span className="text-xs text-slate-500">{t.detalle}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
            >
              {loading ? 'Creando cuenta…' : 'Crear cuenta'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-700">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
