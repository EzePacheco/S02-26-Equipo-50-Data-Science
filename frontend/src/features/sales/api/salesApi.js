// salesApi.js
// API calls for sales - connected to backend

import { post, get, API_ENDPOINTS } from '../../../app/config/api.config.js';

export const salesApi = {
  getAll: async (filters = {}) => {
    try {
      const response = await get(API_ENDPOINTS.SALES.GET_ALL);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch sales');
    } catch (error) {
      console.error('Error fetching sales:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await get(API_ENDPOINTS.SALES.GET_BY_ID(id));
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Sale not found');
    } catch (error) {
      console.error('Error fetching sale:', error);
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
      throw new Error(response.data.error || 'Failed to fetch sales by date range');
    } catch (error) {
      console.error('Error fetching sales by date range:', error);
      throw error;
    }
  },

  create: async (saleData) => {
    try {
      const { customerId, items } = saleData;
      
      const payload = {
        customerId: customerId || null,
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
      throw new Error(response.data.error || 'Failed to create sale');
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error;
    }
  },

  cancel: async (id) => {
    try {
      const response = await get(API_ENDPOINTS.SALES.GET_BY_ID(id));
      if (response.data.success) {
        return { ...response.data.data, cancelled: true, cancelled_at: new Date().toISOString() };
      }
      throw new Error(response.data.error || 'Failed to cancel sale');
    } catch (error) {
      console.error('Error cancelling sale:', error);
      throw error;
    }
  }
};

export default salesApi;
