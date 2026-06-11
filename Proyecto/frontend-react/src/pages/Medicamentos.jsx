import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMedications } from "../api/medicamentosApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { esAdmin } from "../utils/roles.js";

export function Medicamentos() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [error, setError] = useState(null);
  const [categoria, setCategoria] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  const categorias = [
    { value: "todas", label: "Todas las Categorías" },
    { value: "analgesicos", label: "Analgésicos" },
    { value: "antibioticos", label: "Antibióticos" },
    { value: "antiinflamatorios", label: "Antiinflamatorios" },
    { value: "cardiovasculares", label: "Cardiovasculares" },
    { value: "neurologicos", label: "Neurológicos" },
    { value: "dermatologicos", label: "Dermatológicos" },
    { value: "antialergicos", label: "Antialérgicos" },
    { value: "gastrointestinales", label: "Gastrointestinales" },
    { value: "endocrinos", label: "Endocrinos" },
    { value: "respiratorios", label: "Respiratorios" },
    { value: "suplementos", label: "Suplementos y vitaminas" },
  ];

  useEffect(() => {
    let cancelled = false;

    fetchMedications()
      .then((data) => {
        if (!cancelled) {
          setItems(data);
          setFilteredItems(data);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.error ?? e.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const filtered = items.filter((m) => {
      const medCategoria = m.category?.toLowerCase() || "";

      const matchCategoria =
        categoria === "todas" || medCategoria === categoria;

      const matchSearch =
        m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.genericName?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategoria && matchSearch;
    });

    setFilteredItems(filtered);
  }, [items, categoria, searchTerm]);

  const getCategoriaLabel = (cat) => {
    return categorias.find((c) => c.value === cat)?.label || cat;
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">
            💊 Diccionario de medicamentos
          </h1>
          <p className="text-blue-100">
            Explora nuestra base de datos organizada por categorías
          </p>
        </div>

        {esAdmin(user?.type) && (
          <Link
            to="/medicamentos/nuevo"
            className="w-fit rounded-xl bg-white px-5 py-2.5 font-semibold text-indigo-600 shadow-sm transition hover:bg-blue-50"
          >
            + Nuevo medicamento
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar medicamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categorias.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-slate-600 mb-6">
        Mostrando {filteredItems.length} medicamentos
      </p>

      {error && (
        <p className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
          >
            <div className="p-6">
              <div className="mb-4">
                <Link
                  to={`/medicamentos/${m.id}`}
                  className="text-lg font-bold text-slate-900 hover:text-blue-600 transition"
                >
                  {m.name}
                </Link>

                {m.category && (
                  <span className="block w-fit mt-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                    {getCategoriaLabel(m.category.toLowerCase())}
                  </span>
                )}
              </div>

              <p className="text-slate-600 text-sm mb-4">
                {m.description || "Sin descripción disponible"}
              </p>

              <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                {m.genericName && (
                  <div>
                    <p className="text-xs text-slate-500">
                      Principio Activo
                    </p>
                    <p className="text-sm font-medium text-slate-800">
                      {m.genericName}
                    </p>
                  </div>
                )}

                {m.presentation && (
                  <div>
                    <p className="text-xs text-slate-500">Presentación</p>
                    <p className="text-sm font-medium text-slate-800">
                      {m.presentation}
                    </p>
                  </div>
                )}

                {m.administrationRoute && (
                  <div>
                    <p className="text-xs text-slate-500">Vía de administración</p>
                    <p className="text-sm font-medium text-slate-800">
                      {m.administrationRoute}
                    </p>
                  </div>
                )}

                {m.requiresPrescription != null && (
                  <p
                    className={`text-xs font-semibold ${
                      m.requiresPrescription ? "text-amber-600" : "text-green-600"
                    }`}
                  >
                    {m.requiresPrescription
                      ? "⚠ Requiere receta médica"
                      : "✓ Venta libre"}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && !error && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">💊</p>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            No se encontraron medicamentos
          </h3>
          <p className="text-slate-500">
            Intenta con otra categoría o término de búsqueda
          </p>
        </div>
      )}
    </main>
  );
}