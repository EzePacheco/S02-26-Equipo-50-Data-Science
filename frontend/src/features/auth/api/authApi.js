/**
 * authApi.js
 * Funciones API para autenticación
 * Maneja login, registro, logout y gestión de sesión de usuario
 */

import { post, get, API_ENDPOINTS } from '../../../app/config/api.config.js';

/**
 * Funciones API para autenticación
 * @typedef {Object} AuthApi
 * @property {Function} login - Inicia sesión con credenciales
 * @property {Function} register - Registra un nuevo usuario
 * @property {Function} logout - Cierra la sesión actual
 * @property {Function} getCurrentUser - Obtiene el usuario actual
 * @property {Function} getStoredUser - Obtiene el usuario desde localStorage
 * @property {Function} isAuthenticated - Verifica si hay sesión activa
 */

/**
 * Realiza el inicio de sesión del usuario
 * @param {Object} credentials - Credenciales del usuario
 * @param {string} credentials.email - Correo electrónico
 * @param {string} credentials.password - Contraseña
 * @returns {Promise<Object>} Datos del usuario autenticado
 */
export const authApi = {
  login: async (credentials) => {
    const response = await post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.data.success) {
      const { token, user } = response.data.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    throw new Error(response.data.error || 'Error al iniciar sesión');
  },

  register: async (userData) => {
    const response = await post(API_ENDPOINTS.AUTH.REGISTER, userData);
    if (response.data.success) {
      const { token, user } = response.data.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    throw new Error(response.data.error || 'Error al registrar usuario');
  },

  logout: async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await get(API_ENDPOINTS.AUTH.REFRESH);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.error || 'Error al obtener usuario');
  },

  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

export default authApi;
