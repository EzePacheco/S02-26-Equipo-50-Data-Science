// authApi.js
// API calls for authentication

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const authApi = {
  login: async (credentials) => {
    // TODO: Implementar llamada API de login
  },

  logout: async () => {
    // TODO: Implementar llamada API de logout
  },

  getCurrentUser: async () => {
    // TODO: Implementar llamada API de obtener usuario actual
  }
};

export default authApi;
