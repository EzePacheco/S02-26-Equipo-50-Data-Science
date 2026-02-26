// salesApi.js
// API calls for sales

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const salesApi = {
  getAll: async (filters = {}) => {
    // TODO: Implementar obtener todas las ventas
  },

  getById: async (id) => {
    // TODO: Implementar obtener venta por id
  },

  create: async (saleData) => {
    // TODO: Implementar crear venta
  },

  cancel: async (id) => {
    // TODO: Implementar cancelar venta
  }
};

export default salesApi;
