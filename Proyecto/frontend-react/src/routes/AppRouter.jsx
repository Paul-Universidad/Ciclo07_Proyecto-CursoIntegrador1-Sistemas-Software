import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout.jsx';
import { InicioPage } from '../pages/InicioPage.jsx';
import { PanelResumen } from '../pages/PanelResumen.jsx';
import { BusquedaMedicamentos } from '../pages/BusquedaMedicamentos.jsx';
import { Medicamentos } from '../pages/Medicamentos.jsx';
import { MedicamentoDetalle } from '../pages/MedicamentoDetalle.jsx';
import { MedicamentoForm } from '../pages/MedicamentoForm.jsx';
import { Aprendizaje } from '../pages/Aprendizaje.jsx';
import { Consejos } from '../pages/Consejos.jsx';
import { PaginaNoEncontrada } from '../pages/PaginaNoEncontrada.jsx';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/inicio" replace />} />
        <Route path="inicio" element={<InicioPage />} />
        <Route path="panel" element={<PanelResumen />} />
        <Route path="consulta" element={<BusquedaMedicamentos />} />
        <Route path="medicamentos/nuevo" element={<MedicamentoForm />} />
        <Route path="medicamentos/:id/editar" element={<MedicamentoForm />} />
        <Route path="medicamentos/:id" element={<MedicamentoDetalle />} />
        <Route path="medicamentos" element={<Medicamentos />} />
        <Route path="aprendizaje" element={<Aprendizaje />} />
        <Route path="repaso" element={<Navigate to="/aprendizaje" replace />} />
        <Route path="consejos" element={<Consejos />} />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Route>
    </Routes>
  );
}
