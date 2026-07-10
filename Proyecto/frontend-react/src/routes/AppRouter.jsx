import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout.jsx';
import { Login } from '../pages/Login.jsx';
import { Registro } from '../pages/Registro.jsx';
import { InicioPage } from '../pages/InicioPage.jsx';
import { PanelResumen } from '../pages/PanelResumen.jsx';
import { BusquedaMedicamentos } from '../pages/BusquedaMedicamentos.jsx';
import { Medicamentos } from '../pages/Medicamentos.jsx';
import { MedicamentoDetalle } from '../pages/MedicamentoDetalle.jsx';
import { MedicamentoForm } from '../pages/MedicamentoForm.jsx';
import { Aprendizaje } from '../pages/Aprendizaje.jsx';
import { AprendizajeQuiz } from '../pages/AprendizajeQuiz.jsx';
import { AprendizajeCompletar } from '../pages/AprendizajeCompletar.jsx';
import { AprendizajeCasos } from '../pages/AprendizajeCasos.jsx';
import { PaginaNoEncontrada } from '../pages/PaginaNoEncontrada.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { puedeAcceder } from '../utils/roles.js';

function RutaProtegida({ modulo, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (modulo && !puedeAcceder(user.type, modulo)) {
    return <Navigate to="/inicio" replace />;
  }

  return children;
}

function RutaInicio() {
  const { user } = useAuth();
  return <Navigate to={user ? '/inicio' : '/login'} replace />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="registro" element={<Registro />} />

      <Route
        path="/"
        element={
          <RutaProtegida>
            <MainLayout />
          </RutaProtegida>
        }
      >
        <Route index element={<RutaInicio />} />
        <Route path="inicio" element={<InicioPage />} />
        <Route
          path="panel"
          element={
            <RutaProtegida modulo="panel">
              <PanelResumen />
            </RutaProtegida>
          }
        />
        <Route path="consulta" element={<BusquedaMedicamentos />} />
        <Route path="medicamentos/nuevo" element={<MedicamentoForm />} />
        <Route path="medicamentos/:id/editar" element={<MedicamentoForm />} />
        <Route path="medicamentos/:id" element={<MedicamentoDetalle />} />
        <Route path="medicamentos" element={<Medicamentos />} />
        <Route
          path="aprendizaje"
          element={
            <RutaProtegida modulo="aprendizaje">
              <Aprendizaje />
            </RutaProtegida>
          }
        />
        <Route
          path="aprendizaje/quiz"
          element={
            <RutaProtegida modulo="aprendizaje">
              <AprendizajeQuiz />
            </RutaProtegida>
          }
        />
        <Route
          path="aprendizaje/completar"
          element={
            <RutaProtegida modulo="aprendizaje">
              <AprendizajeCompletar />
            </RutaProtegida>
          }
        />
        <Route
          path="aprendizaje/casos"
          element={
            <RutaProtegida modulo="aprendizaje">
              <AprendizajeCasos />
            </RutaProtegida>
          }
        />
        <Route path="repaso" element={<Navigate to="/aprendizaje" replace />} />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Route>
    </Routes>
  );
}
