/**
 * productsApi.js
 * Funciones API para productos
 * Maneja las operaciones CRUD de productos conectadas al backend
 */

import { post, get, put, del, API_ENDPOINTS } from '../../../app/config/api.config.js';

/**
 * Funciones API para gestión de productos
 * @typedef {Object} ProductsApi
 * @property {Function} getAll - Obtiene todos los productos
 * @property {Function} getById - Obtiene un producto por ID
 * @property {Function} getByCategory - Obtiene productos por categoría
 * @property {Function} create - Crea un nuevo producto
 * @property {Function} update - Actualiza un producto
 * @property {Function} delete - Elimina un producto
 */

/**
 * Obtiene todos los productos con filtros opcionales
 * @param {Object} [filters] - Filtros de búsqueda
 * @param {string} [filters.category] - Filtrar por categoría
 * @returns {Promise<Array>} Lista de productos
 */
export const productsApi = {
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category) {
        params.append('category', filters.category);
      }
      
      const url = params.toString() 
        ? `${API_ENDPOINTS.PRODUCTS.GET_ALL}?${params.toString()}` 
        : API_ENDPOINTS.PRODUCTS.GET_ALL;
      
      const response = await get(url);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al obtener productos');
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await get(API_ENDPOINTS.PRODUCTS.GET_BY_ID(id));
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Producto no encontrado');
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      const response = await get(API_ENDPOINTS.PRODUCTS.GET_BY_CATEGORY(category));
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al obtener productos por categoría');
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
      throw error;
    }
  },

  create: async (productData) => {
    try {
      const response = await post(API_ENDPOINTS.PRODUCTS.CREATE, productData);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al crear producto');
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  },

  update: async (id, productData) => {
    try {
      const response = await put(API_ENDPOINTS.PRODUCTS.UPDATE(id), productData);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al actualizar producto');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await del(API_ENDPOINTS.PRODUCTS.DELETE(id));
      if (response.status === 204) {
        return true;
      }
      if (response.data.success) {
        return true;
      }
      throw new Error(response.data.error || 'Error al eliminar producto');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }
};

export default productsApi;
