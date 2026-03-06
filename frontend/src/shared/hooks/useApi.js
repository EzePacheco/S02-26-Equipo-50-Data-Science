/**
 * useApi.js
 * Hook personalizado para llamadas a la API con estados de carga y error
 * Proporciona una interfaz unificada para ejecutar funciones asíncronas
 */

import { useState, useCallback } from 'react';

/**
 * Hook para ejecutar llamadas a la API con manejo de estados
 * @param {Function} apiFunction - Función asíncrona a ejecutar
 * @returns {Object} - Estados y función para ejecutar la llamada
 * @returns {unknown} returns.data - Datos de la respuesta
 * @returns {boolean} returns.loading - Indica si está cargando
 * @returns {string|null} returns.error - Mensaje de error si existe
 * @returns {Function} returns.execute - Función para ejecutar la llamada
 */
export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Ocurrió un error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, execute };
};

export default useApi;
