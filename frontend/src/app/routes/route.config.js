// route.config.js
// Routes configuration constants

export const ROUTES = {
  // Rutas públicas
  LANDING: '/',    //Asegurar bien las rutas
  LOGIN: '/login',
  REGISTER: '/registro',
  // Rutas protegidas
  DASHBOARD: '/dashboard',
  SALES: '/ventas',
  PRODUCTS: '/productos',
  CUSTOMERS: '/clientes',
  INVENTORY: '/inventario',
  SETTINGS: '/configuracion'
};

export const ROUTE_LABELS = {
  [ROUTES.LANDING]: 'Inicio',
  [ROUTES.LOGIN]: 'Iniciar Sesión',
  [ROUTES.REGISTER]: 'Registro',
  [ROUTES.HOME]: 'Dashboard',
  [ROUTES.SALES]: 'Ventas',
  [ROUTES.PRODUCTS]: 'Productos',
  [ROUTES.CUSTOMERS]: 'Clientes',
  [ROUTES.INVENTORY]: 'Inventario',
  [ROUTES.SETTINGS]: 'Configuración'
};

// Rutas públicas (no requieren autenticación)
export const PUBLIC_ROUTES = [
  ROUTES.LANDING,
  ROUTES.LOGIN,
  ROUTES.REGISTER
];
// Rutas protegidas (requieren autenticación)
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.SALES,
  ROUTES.PRODUCTS,
  ROUTES.CUSTOMERS,
  ROUTES.INVENTORY,
  ROUTES.SETTINGS
];

export default ROUTES;
