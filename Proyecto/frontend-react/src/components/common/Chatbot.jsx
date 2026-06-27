import { useState, useRef, useEffect } from 'react';
import { enviarMensaje } from '../../api/chatbotApi.js';

export function Chatbot() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    { rol: 'bot', texto: '¡Hola! Soy el asistente de Pharmly. ¿En qué te puedo ayudar?' }
  ]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  async function onEnviar() {
    if (!input.trim() || cargando) return;
    const texto = input.trim();
    setInput('');
    setMensajes(m => [...m, { rol: 'user', texto }]);
    setCargando(true);
    
    try {
      const respuesta = await enviarMensaje(texto);
      setMensajes(m => [...m, { rol: 'bot', texto: respuesta }]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);  // 👈 Ver esto en F12 > Console
      setMensajes(m => [...m, { 
        rol: 'bot', 
        texto: 'Ocurrió un error al conectar con el asistente. Intenta de nuevo.' 
      }]);
    } finally {
      setCargando(false);
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setAbierto(v => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-2xl text-white shadow-lg transition hover:bg-teal-700"
        aria-label="Abrir chatbot"
      >
        {abierto ? '✕' : '💬'}
      </button>

      {/* Ventana del chat */}
      {abierto && (
        <div className="fixed bottom-24 right-6 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-teal-600 px-4 py-3 text-white">
            <p className="font-bold">⚕️ Asistente Pharmly</p>
            <p className="text-xs opacity-80">Consultas sobre medicamentos y salud</p>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {mensajes.map((m, i) => (
              <div key={i} className={`flex ${m.rol === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  m.rol === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  {m.texto}
                </span>
              </div>
            ))}
            {cargando && (
              <div className="flex justify-start">
                <span className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-500">
                  Escribiendo…
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t border-slate-200 p-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onEnviar()}
              placeholder="Escribe tu consulta..."
              className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500"
            />
            <button
              onClick={onEnviar}
              disabled={cargando}
              className="rounded-xl bg-teal-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}