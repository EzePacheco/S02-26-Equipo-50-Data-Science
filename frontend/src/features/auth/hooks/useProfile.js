// src/features/auth/hooks/useProfile.js
import { useState } from 'react';
import { post, get } from '../../../app/config/api.config';
import API_CONFIG from '../../../app/config/api.config';

/**
 * Hook para manejar el perfil y la tienda del usuario
 * @param {string} userId - ID del usuario
 * @returns {object} - Métodos para actualizar y obtener perfil
 */
export function useProfile(userId) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Crea la tienda del usuario (onboarding)
   */
  const updateProfile = {
    mutateAsync: async (profileData) => {
      setIsLoading(true);
      setError(null);

      try {
        // Llamar al backend: POST /api/stores
        const response = await post(API_CONFIG.ENDPOINTS.STORES.CREATE, {
          name: profileData.store_name,
          categories: profileData.main_categories,
        });

        // Actualizar usuario en localStorage con los datos de la tienda
        const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = {
          ...existingUser,
          store_id: response.id,
          store_name: response.name,
          store_categories: response.categories,
          onboarding_completed: true,
          updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem('onboarding_completed', 'true');

        return response;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    isLoading,
    error,
  };

  /**
   * Obtiene la tienda del usuario logueado
   */
  const getMyStore = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Llamar al backend: GET /api/stores/my-store
      const response = await get(API_CONFIG.ENDPOINTS.STORES.GET_MY_STORE);

      // Actualizar localStorage con los datos actualizados
      const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = {
        ...existingUser,
        store_id: response.id,
        store_name: response.name,
        store_categories: response.categories,
        onboarding_completed: true,
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return { data: response, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    getMyStore,
    isLoading,
    error,
  };
}

export default useProfile;