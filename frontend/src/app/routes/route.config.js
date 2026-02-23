// route.config.js
// Routes configuration constants

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: 'Dashboard',
  SALES: '/ventas',
  PRODUCTS: '/productos',
  CUSTOMERS: '/clientes',
  INVENTORY: '/inventario',
  SETTINGS: '/configuracion'
};

export const ROUTE_LABELS = {
  [ROUTES.HOME]: '/',
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.SALES]: 'Ventas',
  [ROUTES.PRODUCTS]: 'Productos',
  [ROUTES.CUSTOMERS]: 'Clientes',
  [ROUTES.INVENTORY]: 'Inventario',
  [ROUTES.SETTINGS]: 'Configuración'
};

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.SALES,
  ROUTES.PRODUCTS,
  ROUTES.CUSTOMERS,
  ROUTES.INVENTORY
];

export default ROUTES;
