/**
 * inventoryApi.js
 * Funciones API para inventario
 * Maneja las operaciones de gestión de inventario conectadas al backend
 */

import { get, put, patch, API_ENDPOINTS } from '../../../app/config/api.config.js';

/**
 * Funciones API para gestión de inventario
 * @typedef {Object} InventoryApi
 * @property {Function} getAll - Obtiene todo el inventario
 * @property {Function} getByProductId - Obtiene inventario por ID de producto
 * @property {Function} getLowStock - Obtiene productos con stock bajo
 * @property {Function} updateStock - Actualiza el stock de un producto
 * @property {Function} adjustStock - Ajusta el stock (suma/resta)
 * @property {Function} setMinStock - Establece el stock mínimo
 */

/**
 * Obtiene todo el inventario
 * @returns {Promise<Array>} Lista de productos con inventario
 */
export const inventoryApi = {
  getAll: async () => {
    try {
      const response = await get(API_ENDPOINTS.INVENTORY.GET_ALL);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al obtener inventario');
    } catch (error) {
      console.error('Error al obtener inventario:', error);
      throw error;
    }
  },

  getByProductId: async (productId) => {
    try {
      const response = await get(API_ENDPOINTS.INVENTORY.GET_BY_PRODUCT(productId));
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Inventario no encontrado');
    } catch (error) {
      console.error('Error al obtener inventario por producto:', error);
      throw error;
    }
  },

  getLowStock: async () => {
    try {
      const response = await get(`${API_ENDPOINTS.INVENTORY.GET_ALL}/low-stock`);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al obtener productos con stock bajo');
    } catch (error) {
      console.error('Error al obtener stock bajo:', error);
      throw error;
    }
  },

  updateStock: async (productId, quantity) => {
    try {
      const response = await put(`${API_ENDPOINTS.INVENTORY.GET_BY_PRODUCT(productId)}/stock`, { quantity });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al actualizar stock');
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      throw error;
    }
  },

  adjustStock: async (productId, adjustment) => {
    try {
      const response = await put(`${API_ENDPOINTS.INVENTORY.GET_BY_PRODUCT(productId)}/stock`, { adjustment });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al ajustar stock');
    } catch (error) {
      console.error('Error al ajustar stock:', error);
      throw error;
    }
  },

  setMinStock: async (productId, minStock) => {
    try {
      const response = await patch(`${API_ENDPOINTS.INVENTORY.GET_BY_PRODUCT(productId)}/min-stock`, { minStock });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al establecer stock mínimo');
    } catch (error) {
      console.error('Error al establecer stock mínimo:', error);
      throw error;
    }
  }
};

export default inventoryApi;
