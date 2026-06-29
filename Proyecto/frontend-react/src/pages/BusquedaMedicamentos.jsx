import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { buscarGlobal } from '../api/busquedaApi.js';

export function BusquedaMedicamentos() {
  const [params, setParams] = useSearchParams();
  const qParam = params.get('q') ?? '';
  const [query, setQuery] = useState(qParam);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  useEffect(() => {
    if (!qParam.trim()) {
      setResultado(null);
      setError(null);
      return;
    }

    let cancelled = false;

    buscarGlobal(qParam.trim())
      .then((data) => {
        if (!cancelled) {
          setResultado(data);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setResultado(null);
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

  const medicamentos = resultado?.medications ?? [];
  const dolencias = resultado?.ailments ?? [];
  const sinResultados =
    qParam.trim() && resultado && medicamentos.length === 0 && dolencias.length === 0;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 p-8 text-white shadow-lg">
          <h1 className="text-3xl font-extrabold">Búsqueda inteligente</h1>
          <p className="mt-2 opacity-90">
            Escribe un medicamento o una dolencia: te diremos qué significa, para qué
            suele tomarse y algunos consejos útiles.
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
            ¿Qué quieres consultar?
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="q"
              name="q"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej.: paracetamol, gripe, migraña, anemia..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              🔍 Buscar
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            💡 Prueba con un medicamento (“ibuprofeno”) o con una dolencia (“gastritis”).
          </p>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* No Results */}
        {sinResultados && !error && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm border border-slate-200">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
              🔎
            </div>
            <p className="text-lg font-semibold text-slate-700">
              No se encontraron coincidencias
            </p>
            <p className="mt-1 text-slate-500">
              Intenta con otro medicamento o dolencia, por ejemplo “amoxicilina” o “asma”.
            </p>
          </div>
        )}

        {/* Dolencias */}
        {dolencias.length > 0 && (
          <>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-800">
              🩺 Dolencias <span className="rounded-full bg-rose-100 px-3 py-0.5 text-sm text-rose-700">{dolencias.length}</span>
            </h2>
            <div className="mb-10 grid gap-6">
              {dolencias.map((d) => (
                <article
                  key={`d-${d.id}`}
                  className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-4 border-b border-rose-100 bg-rose-50/60 px-6 py-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-2xl">
                      🩺
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{d.name}</h3>
                      {d.category && (
                        <span className="mt-1 inline-block rounded-full bg-rose-100 px-3 py-0.5 text-xs font-semibold text-rose-700">
                          {d.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 p-6 md:grid-cols-3">
                    {d.description && (
                      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                        <p className="text-sm font-bold text-blue-700">📖 ¿Qué es?</p>
                        <p className="mt-1 text-sm text-slate-700">{d.description}</p>
                      </div>
                    )}
                    {d.symptoms && (
                      <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                        <p className="text-sm font-bold text-amber-700">🌡️ Síntomas frecuentes</p>
                        <p className="mt-1 text-sm text-slate-700">{d.symptoms}</p>
                      </div>
                    )}
                    {d.advice && (
                      <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                        <p className="text-sm font-bold text-green-700">💡 Consejos</p>
                        <p className="mt-1 text-sm text-slate-700">{d.advice}</p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* Medicamentos */}
        {medicamentos.length > 0 && (
          <>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-800">
              💊 Medicamentos <span className="rounded-full bg-blue-100 px-3 py-0.5 text-sm text-blue-700">{medicamentos.length}</span>
            </h2>
            <div className="grid gap-6">
              {medicamentos.map((m) => (
                <article
                  key={`m-${m.id}`}
                  className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 transition hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                      💊
                    </div>

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

                      {m.description && (
                        <p className="mt-4 text-slate-600">{m.description}</p>
                      )}

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {m.commonUsage && (
                          <div className="rounded-xl border border-teal-100 bg-teal-50 p-3">
                            <p className="text-sm font-semibold text-teal-700">
                              🎯 ¿Para qué suele tomarse?
                            </p>
                            <p className="text-sm text-slate-700">{m.commonUsage}</p>
                          </div>
                        )}
                        {m.precautions && (
                          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-3">
                            <p className="text-sm font-semibold text-yellow-800">
                              ⚠ Consejos y precauciones
                            </p>
                            <p className="text-sm text-slate-700">{m.precautions}</p>
                          </div>
                        )}
                      </div>

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
          </>
        )}
      </section>
    </main>
  );
}
