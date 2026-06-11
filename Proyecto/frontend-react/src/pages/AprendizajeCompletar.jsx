import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchParrafoAleatorio } from '../api/aprendizajeApi.js';

// Compara sin distinguir mayúsculas ni tildes.
function normalizar(texto) {
  return texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Divide el contenido en segmentos de texto y huecos [palabra].
function parsearContenido(contenido) {
  const partes = contenido.split(/\[([^\]]+)\]/g);
  return partes.map((texto, i) => ({
    tipo: i % 2 === 1 ? 'hueco' : 'texto',
    texto,
  }));
}

export function AprendizajeCompletar() {
  const [parrafo, setParrafo] = useState(null);
  const [valores, setValores] = useState({});
  const [mostrarCorreccion, setMostrarCorreccion] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarParrafo = useCallback(async (excluirId) => {
    setLoading(true);
    setError(null);
    setValores({});
    setMostrarCorreccion(false);
    try {
      const data = await fetchParrafoAleatorio(excluirId);
      setParrafo(data);
    } catch (e) {
      setError(e?.response?.data?.error ?? e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarParrafo();
  }, [cargarParrafo]);

  const segmentos = useMemo(
    () => (parrafo ? parsearContenido(parrafo.content) : []),
    [parrafo]
  );

  const totalHuecos = segmentos.filter((s) => s.tipo === 'hueco').length;
  let indiceHueco = -1;
  const completados = segmentos.reduce((acc, seg, i) => {
    if (seg.tipo !== 'hueco') return acc;
    const valor = valores[i] ?? '';
    return normalizar(valor) === normalizar(seg.texto) ? acc + 1 : acc;
  }, 0);

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Completar palabras
          </h1>
          <p className="text-slate-600">
            Escribe las palabras que faltan: si aciertas, se marcarán en verde
            automáticamente.
          </p>
        </div>

        <Link
          to="/aprendizaje"
          className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Volver
        </Link>
      </div>

      {error && (
        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </p>
      )}

      {loading && <p className="text-slate-500">Cargando párrafo…</p>}

      {!loading && parrafo && (
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">
              {parrafo.title}
            </h2>
            <span
              className={`rounded-full px-4 py-1 text-sm font-semibold ${
                completados === totalHuecos
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-50 text-blue-600'
              }`}
            >
              {completados} / {totalHuecos} palabras
            </span>
          </div>

          <p className="text-lg leading-loose text-slate-700">
            {segmentos.map((seg, i) => {
              if (seg.tipo === 'texto') {
                return <span key={i}>{seg.texto}</span>;
              }

              indiceHueco += 1;
              const valor = valores[i] ?? '';
              const correcta = normalizar(valor) === normalizar(seg.texto);

              if (correcta) {
                return (
                  <strong
                    key={i}
                    className="mx-1 rounded-md bg-green-100 px-2 py-0.5 font-bold text-green-700"
                  >
                    {seg.texto}
                  </strong>
                );
              }

              // Palabra revelada por el botón «Corregir» (no cuenta como acierto)
              if (mostrarCorreccion) {
                return (
                  <strong
                    key={i}
                    className="mx-1 rounded-md border border-dashed border-amber-400 bg-amber-100 px-2 py-0.5 font-bold text-amber-700"
                  >
                    {seg.texto}
                  </strong>
                );
              }

              return (
                <input
                  key={i}
                  type="text"
                  value={valor}
                  onChange={(e) =>
                    setValores((v) => ({ ...v, [i]: e.target.value }))
                  }
                  placeholder={`Palabra ${indiceHueco + 1}`}
                  style={{ width: `${Math.max(seg.texto.length + 4, 10)}ch` }}
                  className="mx-1 inline-block rounded-md border border-slate-300 px-2 py-1 text-center text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              );
            })}
          </p>

          {completados === totalHuecos && (
            <p className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 font-medium text-green-700">
              🎉 ¡Excelente! Completaste todo el párrafo. Pulsa «Siguiente»
              para intentar con otro.
            </p>
          )}

          {mostrarCorreccion && completados < totalHuecos && (
            <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
              👀 Las palabras en <strong>ámbar</strong> son la corrección.
              Pulsa «Ocultar corrección» para borrarlas e intentarlo tú.
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMostrarCorreccion((v) => !v)}
              disabled={completados === totalHuecos}
              className={`rounded-lg px-6 py-2.5 font-medium transition disabled:opacity-40 ${
                mostrarCorreccion
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'border border-amber-500 text-amber-600 hover:bg-amber-50'
              }`}
            >
              {mostrarCorreccion ? '🙈 Ocultar corrección' : '✅ Corregir'}
            </button>

            <button
              type="button"
              onClick={() => cargarParrafo(parrafo.id)}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              Siguiente →
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
