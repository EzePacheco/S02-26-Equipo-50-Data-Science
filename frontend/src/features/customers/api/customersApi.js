// customersApi.js
// API calls for customers - connected to backend

import { post, get, put, del, API_ENDPOINTS } from '../../../app/config/api.config.js';

export const customersApi = {
  getAll: async () => {
    try {
      const response = await get(API_ENDPOINTS.CUSTOMERS.GET_ALL);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch customers');
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await get(API_ENDPOINTS.CUSTOMERS.GET_BY_ID(id));
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Customer not found');
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  create: async (customerData) => {
    try {
      const response = await post(API_ENDPOINTS.CUSTOMERS.CREATE, customerData);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to create customer');
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  update: async (id, customerData) => {
    try {
      const response = await put(API_ENDPOINTS.CUSTOMERS.UPDATE(id), customerData);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to update customer');
    } catch (error) {
      console.error('Error updating customer:', error);
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
      throw new Error(response.data.error || 'Failed to delete customer');
    } catch (error) {
      console.error('Error deleting customer:', error);
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
      throw new Error(response.data.error || 'Failed to search customers');
    } catch (error) {
      console.error('Error searching customers:', error);
      throw error;
    }
  }
};

export default customersApi;
