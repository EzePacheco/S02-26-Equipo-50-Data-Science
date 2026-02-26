// inventoryApi.js
// API calls for inventory - connected to backend

import { get, put, patch, API_ENDPOINTS } from '../../../app/config/api.config.js';

export const inventoryApi = {
  getAll: async () => {
    try {
      const response = await get(API_ENDPOINTS.INVENTORY.GET_ALL);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch inventory');
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  },

  getByProductId: async (productId) => {
    try {
      const response = await get(API_ENDPOINTS.INVENTORY.GET_BY_PRODUCT(productId));
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Inventory not found');
    } catch (error) {
      console.error('Error fetching inventory by product:', error);
      throw error;
    }
  },

  getLowStock: async () => {
    try {
      const response = await get(`${API_ENDPOINTS.INVENTORY.GET_ALL}/low-stock`);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch low stock items');
    } catch (error) {
      console.error('Error fetching low stock:', error);
      throw error;
    }
  },

  updateStock: async (productId, quantity) => {
    try {
      const response = await put(`${API_ENDPOINTS.INVENTORY.GET_BY_PRODUCT(productId)}/stock`, { quantity });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to update stock');
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  },

  adjustStock: async (productId, adjustment) => {
    try {
      const response = await put(`${API_ENDPOINTS.INVENTORY.GET_BY_PRODUCT(productId)}/stock`, { adjustment });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to adjust stock');
    } catch (error) {
      console.error('Error adjusting stock:', error);
      throw error;
    }
  },

  setMinStock: async (productId, minStock) => {
    try {
      const response = await patch(`${API_ENDPOINTS.INVENTORY.GET_BY_PRODUCT(productId)}/min-stock`, { minStock });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to set min stock');
    } catch (error) {
      console.error('Error setting min stock:', error);
      throw error;
    }
  }
};

export default inventoryApi;
