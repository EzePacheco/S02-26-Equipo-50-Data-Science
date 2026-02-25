// inventoryApi.js
// API calls for inventory

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const inventoryApi = {
  getAll: async () => {
    // TODO: Implementar obtener todo el inventario
  },

  getByProductId: async (productId) => {
    // TODO: Implementar obtener inventario por id de producto
  },

  getLowStock: async () => {
    // TODO: Implementar obtener artículos con stock bajo
  },

  updateStock: async (productId, quantity) => {
    // TODO: Implementar actualizar stock
  },

  setMinStock: async (productId, minStock) => {
    // TODO: Implementar establecer stock mínimo
  }
};

export default inventoryApi;
