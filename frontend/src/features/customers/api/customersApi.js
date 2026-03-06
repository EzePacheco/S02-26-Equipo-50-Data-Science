/**
 * customersApi.js
 * Funciones API para clientes
 * Maneja las operaciones CRUD de clientes conectadas al backend
 */

import { post, get, put, del, API_ENDPOINTS } from '../../../app/config/api.config.js';

/**
 * Funciones API para gestión de clientes
 * @typedef {Object} CustomersApi
 * @property {Function} getAll - Obtiene todos los clientes
 * @property {Function} getById - Obtiene un cliente por ID
 * @property {Function} create - Crea un nuevo cliente
 * @property {Function} update - Actualiza un cliente
 * @property {Function} delete - Elimina un cliente
 * @property {Function} search - Busca clientes por nombre o email
 */

/**
 * Obtiene todos los clientes
 * @returns {Promise<Array>} Lista de clientes
 */
export const customersApi = {
  getAll: async () => {
    try {
      const response = await get(API_ENDPOINTS.CUSTOMERS.GET_ALL);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al obtener clientes');
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await get(API_ENDPOINTS.CUSTOMERS.GET_BY_ID(id));
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Cliente no encontrado');
    } catch (error) {
      console.error('Error al obtener cliente:', error);
      throw error;
    }
  },

  create: async (customerData) => {
    try {
      const response = await post(API_ENDPOINTS.CUSTOMERS.CREATE, customerData);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al crear cliente');
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw error;
    }
  },

  update: async (id, customerData) => {
    try {
      const response = await put(API_ENDPOINTS.CUSTOMERS.UPDATE(id), customerData);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al actualizar cliente');
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await del(API_ENDPOINTS.CUSTOMERS.DELETE(id));
      if (response.status === 204) {
        return true;
      }
      if (response.data.success) {
        return true;
      }
      throw new Error(response.data.error || 'Error al eliminar cliente');
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      throw error;
    }
  },

  search: async (query) => {
    try {
      const params = new URLSearchParams({ q: query });
      const response = await get(`${API_ENDPOINTS.CUSTOMERS.GET_ALL}/search?${params.toString()}`);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al buscar clientes');
    } catch (error) {
      console.error('Error al buscar clientes:', error);
      throw error;
    }
  }
};

export default customersApi;
