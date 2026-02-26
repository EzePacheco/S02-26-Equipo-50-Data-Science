// api.config.js
// API configuration

const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json'
  },
  // Endpoints de la API
  ENDPOINTS: {
    // Autenticación
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
    },
    
    // Tiendas (Onboarding)
    STORES: {
      CREATE: '/stores',              // POST - Crear tienda
      GET_MY_STORE: '/stores/my-store', // GET - Obtener mi tienda
      UPDATE: '/stores',              // PATCH - Actualizar tienda
    },
  }
};

export const apiClient = async (endpoint, options = {}) => {
  // TODO: Implementar cliente API con:
  // - Concatenación de URL base
  // - Headers por defecto
  // - Manejo de timeout
  // - Manejo de errores
  // - Inyección de token (cuando auth esté listo)
  
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      ...API_CONFIG.HEADERS,
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default API_CONFIG;

export const get = (endpoint) => {
  return apiClient(endpoint, {
    method: 'GET',
  });
};

export const post = (endpoint, data) => {
  return apiClient(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};