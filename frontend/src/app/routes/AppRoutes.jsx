// AppRoutes.jsx
// Main routes configuration

import { Routes, Route, Navigate } from 'react-router-dom';
// TODO: Importar componentes de página cuando se creen
// import SalesPage from '../features/sales/pages/SalesPage';
// import ProductsPage from '../features/products/pages/ProductsPage';
// etc...

const AppRoutes = () => {
  return (
    <Routes>
      {/* TODO: Definir rutas */}
      <Route path="/" element={<div>Dashboard (TODO)</div>} />
      <Route path="/ventas" element={<div>Ventas (TODO)</div>} />
      <Route path="/productos" element={<div>Productos (TODO)</div>} />
      <Route path="/clientes" element={<div>Clientes (TODO)</div>} />
      <Route path="/inventario" element={<div>Inventario (TODO)</div>} />
      
      {/* Redirect to home for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
