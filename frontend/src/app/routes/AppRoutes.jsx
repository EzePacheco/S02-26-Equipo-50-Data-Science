// AppRoutes.jsx
// Main routes configuration

import { Routes, Route, Navigate } from 'react-router-dom';
import ROUTES from './route.config';


import Landing from '../../features/landing/components/landing';
import Login from '../../features/auth/components/Login';
import Register from '../../features/auth/components/Register';
import Onboarding from '../../features/onboarding/components/onboarding';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ===== RUTAS PÚBLICAS ===== */}
      <Route path={ROUTES.LANDING} element={<Landing />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />  
          
      {/* ===== RUTAS PROTEGIDAS ===== */}
      {/* Se debe Agregar componente ProtectedRoute cuando implementes autenticación <=<=<=<=<=<=<=<=<=<=<=<= */}  
      <Route path={ROUTES.DASHBOARD} element={<div>Dashboard (TODO)</div>} />
      <Route path={ROUTES.SALES} element={<div>Ventas (TODO)</div>} />
      <Route path={ROUTES.PRODUCTS} element={<div>Productos (TODO)</div>} />
      <Route path={ROUTES.CUSTOMERS} element={<div>Clientes (TODO)</div>} />
      <Route path={ROUTES.INVENTORY} element={<div>Inventario (TODO)</div>} />
      <Route path={ROUTES.SETTINGS} element={<div>Configuración (TODO)</div>} />
      
      {/* Redirect to home for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
