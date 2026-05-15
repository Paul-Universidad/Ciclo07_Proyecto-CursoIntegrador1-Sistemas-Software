import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchMedications } from '../api/medicamentosApi.js';

export function BusquedaMedicamentos() {
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
        if (!cancelled) {
          setResults(data);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setResults([]);
          setError(e?.response?.data?.error ?? e.message);
        }
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
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Consulta de Medicamentos
          </h1>
          <p className="mt-2 text-slate-500">
            Busca información detallada por nombre comercial o denominación genérica.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={onSubmit}
          className="mb-8 rounded-2xl bg-white p-6 shadow-sm border border-slate-200"
        >
          <label
            htmlFor="q"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Buscar medicamento
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="q"
              name="q"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej.: ibuprofeno, paracetamol..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            💡 Ejemplo: Busca “Paracetamol”, “Ibuprofeno” o “Amoxicilina”.
          </p>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Results Header */}
        {qParam.trim() && (
          <h2 className="mb-4 text-xl font-bold text-slate-800">
            Resultados de búsqueda
          </h2>
        )}

        {/* No Results */}
        {qParam.trim() && results.length === 0 && !error && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm border border-slate-200">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
              💊
            </div>
            <p className="text-lg font-semibold text-slate-700">
              No se encontraron coincidencias
            </p>
            <p className="mt-1 text-slate-500">
              Intenta con otro nombre comercial o genérico.
            </p>
          </div>
        )}

        {/* Results List */}
        <div className="grid gap-6">
          {results.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 transition hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  💊
                </div>

                {/* Main Info */}
                <div className="flex-1">
                  <Link
                    to={`/medicamentos/${m.id}`}
                    className="text-2xl font-bold text-slate-900 hover:text-blue-600"
                  >
                    {m.name}
                  </Link>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.category && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        {m.category}
                      </span>
                    )}

                    {m.genericName && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                        {m.genericName}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {m.description && (
                    <p className="mt-4 text-slate-600">
                      {m.description}
                    </p>
                  )}

                  {/* Dose */}
                  {m.dose && (
                    <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-3">
                      <p className="text-sm font-semibold text-green-700">
                        🧪 Dosis recomendada:
                      </p>
                      <p className="text-sm text-green-800">{m.dose}</p>
                    </div>
                  )}

                  {/* Warning */}
                  {m.warning && (
                    <div className="mt-3 rounded-xl border border-yellow-200 bg-yellow-50 p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>⚠ Advertencia:</strong> {m.warning}
                      </p>
                    </div>
                  )}

                  {/* Button */}
                  <div className="mt-5">
                    <Link
                      to={`/medicamentos/${m.id}`}
                      className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      Ver detalle completo
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
