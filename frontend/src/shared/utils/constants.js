// constants.js
// Shared constants

export const PRODUCT_CATEGORIES = {
  ROPA: 'ROPA',
  CALZADO: 'CALZADO'
};

export const PRODUCT_CATEGORY_LABELS = {
  [PRODUCT_CATEGORIES.ROPA]: 'Ropa',
  [PRODUCT_CATEGORIES.CALZADO]: 'Calzado'
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SALES: '/ventas',
  PRODUCTS: '/productos',
  CUSTOMERS: '/clientes',
  INVENTORY: '/inventario'
};
