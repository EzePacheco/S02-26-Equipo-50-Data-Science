/**
 * api.config.js
 * Axios API client configuration for backend communication
 */

import axios from 'axios';

const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
};

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  STORES: {
    CREATE: '/stores',
    GET_MY_STORE: '/stores/my-store',
    UPDATE: '/stores',
  },
  PRODUCTS: {
    GET_ALL: '/products',
    GET_BY_ID: (id) => `/products/${id}`,
    GET_BY_CATEGORY: (category) => `/products/category/${category}`,
    CREATE: '/products',
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
  },
  SALES: {
    GET_ALL: '/sales',
    GET_BY_ID: (id) => `/sales/${id}`,
    CREATE: '/sales',
    UPDATE: (id) => `/sales/${id}`,
    DELETE: (id) => `/sales/${id}`,
  },
  INVENTORY: {
    GET_ALL: '/inventory',
    GET_BY_ID: (id) => `/inventory/${id}`,
    GET_BY_PRODUCT: (productId) => `/inventory/product/${productId}`,
    CREATE: '/inventory',
    UPDATE: (id) => `/inventory/${id}`,
  },
  CUSTOMERS: {
    GET_ALL: '/customers',
    GET_BY_ID: (id) => `/customers/${id}`,
    CREATE: '/customers',
    UPDATE: (id) => `/customers/${id}`,
    DELETE: (id) => `/customers/${id}`,
  },
};

export const get = (endpoint, config = {}) => apiClient.get(endpoint, config);
export const post = (endpoint, data, config = {}) => apiClient.post(endpoint, data, config);
export const put = (endpoint, data, config = {}) => apiClient.put(endpoint, data, config);
export const patch = (endpoint, data, config = {}) => apiClient.patch(endpoint, data, config);
export const del = (endpoint, config = {}) => apiClient.delete(endpoint, config);

export default API_CONFIG;
