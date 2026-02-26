// productsApi.js
// API calls for products - connected to backend

import { post, get, put, del, API_ENDPOINTS } from '../../../app/config/api.config.js';

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
      throw new Error(response.data.error || 'Failed to fetch products');
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await get(API_ENDPOINTS.PRODUCTS.GET_BY_ID(id));
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Product not found');
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      const response = await get(API_ENDPOINTS.PRODUCTS.GET_BY_CATEGORY(category));
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch products by category');
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  create: async (productData) => {
    try {
      const response = await post(API_ENDPOINTS.PRODUCTS.CREATE, productData);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to create product');
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  update: async (id, productData) => {
    try {
      const response = await put(API_ENDPOINTS.PRODUCTS.UPDATE(id), productData);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to update product');
    } catch (error) {
      console.error('Error updating product:', error);
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
      throw new Error(response.data.error || 'Failed to delete product');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

export default productsApi;
