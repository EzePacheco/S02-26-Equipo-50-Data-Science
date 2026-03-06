/**
 * salesApi.js
 * Funciones API para ventas
 * Maneja las operaciones CRUD de ventas conectadas al backend
 */

import { post, get, API_ENDPOINTS } from '../../../app/config/api.config.js';

/**
 * Funciones API para gestión de ventas
 * @typedef {Object} SalesApi
 * @property {Function} getAll - Obtiene todas las ventas
 * @property {Function} getById - Obtiene una venta por ID
 * @property {Function} getByDateRange - Obtiene ventas por rango de fechas
 * @property {Function} create - Crea una nueva venta
 * @property {Function} cancel - Cancela una venta existente
 */

/**
 * Obtiene todas las ventas
 * @param {Object} [filters] - Filtros opcionales
 * @returns {Promise<Array>} Lista de ventas
 */
export const salesApi = {
  getAll: async (filters = {}) => {
    try {
      const response = await get(API_ENDPOINTS.SALES.GET_ALL);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al obtener ventas');
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await get(API_ENDPOINTS.SALES.GET_BY_ID(id));
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Venta no encontrada');
    } catch (error) {
      console.error('Error al obtener venta:', error);
      throw error;
    }
  },

  getByDateRange: async (startDate, endDate) => {
    try {
      const params = new URLSearchParams({ startDate, endDate });
      const response = await get(`${API_ENDPOINTS.SALES.GET_ALL}/date-range?${params.toString()}`);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al obtener ventas por fecha');
    } catch (error) {
      console.error('Error al obtener ventas por fecha:', error);
      throw error;
    }
  },

  create: async (saleData) => {
    try {
      const { customerId, customerName, items, paymentMethod } = saleData;

      const payload = {
        customerId: customerId || null,
        customerName: customerName || null,
        paymentMethod: paymentMethod || 'efectivo',
        items: items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: parseFloat(item.unitPrice),
        })),
      };

      const response = await post(API_ENDPOINTS.SALES.CREATE, payload);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Error al crear venta');
    } catch (error) {
      console.error('Error al crear venta:', error);
      throw error;
    }
  },

  cancel: async (id) => {
    try {
      const response = await get(API_ENDPOINTS.SALES.GET_BY_ID(id));
      if (response.data.success) {
        return { ...response.data.data, cancelled: true, cancelled_at: new Date().toISOString() };
      }
      throw new Error(response.data.error || 'Error al cancelar venta');
    } catch (error) {
      console.error('Error al cancelar venta:', error);
      throw error;
    }
  }
};

export default salesApi;
