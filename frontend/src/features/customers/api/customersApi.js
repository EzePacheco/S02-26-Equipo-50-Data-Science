// customersApi.js
// API calls for customers

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const customersApi = {
  getAll: async () => {
    // TODO: Implementar obtener todos los clientes
  },

  getById: async (id) => {
    // TODO: Implementar obtener cliente por id
  },

  create: async (customerData) => {
    // TODO: Implementar crear cliente
  },

  update: async (id, customerData) => {
    // TODO: Implementar actualizar cliente
  },

  delete: async (id) => {
    // TODO: Implementar eliminar cliente
  },

  search: async (query) => {
    // TODO: Implementar búsqueda de clientes
  }
};

export default customersApi;
