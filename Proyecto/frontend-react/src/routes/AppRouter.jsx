import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout.jsx';
import { Home } from '../pages/Home.jsx';
import { Panel } from '../pages/Panel.jsx';
import { Consulta } from '../pages/Consulta.jsx';
import { Medicamentos } from '../pages/Medicamentos.jsx';
import { MedicamentoDetalle } from '../pages/MedicamentoDetalle.jsx';
import { MedicamentoForm } from '../pages/MedicamentoForm.jsx';
import { Repaso } from '../pages/Repaso.jsx';
import { Consejos } from '../pages/Consejos.jsx';
import { NotFound } from '../pages/NotFound.jsx';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/inicio" replace />} />
        <Route path="inicio" element={<Home />} />
        <Route path="panel" element={<Panel />} />
        <Route path="consulta" element={<Consulta />} />
        <Route path="medicamentos/nuevo" element={<MedicamentoForm />} />
        <Route path="medicamentos/:id/editar" element={<MedicamentoForm />} />
        <Route path="medicamentos/:id" element={<MedicamentoDetalle />} />
        <Route path="medicamentos" element={<Medicamentos />} />
        <Route path="repaso" element={<Repaso />} />
        <Route path="consejos" element={<Consejos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
