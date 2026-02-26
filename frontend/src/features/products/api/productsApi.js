// productsApi.js
// API calls for products

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const productsApi = {
  getAll: async (filters = {}) => {
    // TODO: Implementar obtener todos los productos
  },

  getById: async (id) => {
    // TODO: Implementar obtener producto por id
  },

  getByCategory: async (category) => {
    // TODO: Implementar obtener productos por categoría
  },

  create: async (productData) => {
    // TODO: Implementar crear producto
  },

  update: async (id, productData) => {
    // TODO: Implementar actualizar producto
  },

  delete: async (id) => {
    // TODO: Implementar eliminar producto
  }
};

export default productsApi;
