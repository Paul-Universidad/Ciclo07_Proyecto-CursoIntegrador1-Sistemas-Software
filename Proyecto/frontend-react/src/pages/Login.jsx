import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginUsuario } from '../api/usuariosApi.js';
import { useAuth } from '../context/AuthContext.jsx';

export function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/inicio" replace />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!usuario.trim() || !contrasenia.trim()) {
      setError('Ingresa tu usuario y contraseña.');
      return;
    }

    setLoading(true);
    try {
      const data = await loginUsuario(usuario.trim(), contrasenia);
      login(data);
      navigate('/inicio', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.error ?? 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 overflow-y-auto">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900">PHARMLY</h1>
            <p className="mt-2 text-sm text-slate-500">
              Sistema de consulta y repaso de medicamentos
            </p>
          </div>

          {error && (
            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="usuario"
                className="mb-1 block text-sm font-semibold text-slate-700"
              >
                Usuario
              </label>
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ej.: estudiante"
                autoComplete="username"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="contrasenia"
                className="mb-1 block text-sm font-semibold text-slate-700"
              >
                Contraseña
              </label>
              <input
                id="contrasenia"
                type="password"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? 'Ingresando…' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
