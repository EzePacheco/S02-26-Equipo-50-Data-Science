// src/features/auth/hooks/useProfile.js
import { useState } from 'react';
import { post, get, API_ENDPOINTS } from '../../../app/config/api.config';
import { useAuth } from './useAuth';

/**
 * Hook para manejar el perfil y la tienda del usuario
 * @param {string} userId - ID del usuario
 * @returns {object} - Métodos para actualizar y obtener perfil
 */
export function useProfile(userId) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useAuth();

  /**
   * Crea la tienda del usuario (onboarding)
   */
  const updateProfile = {
    mutateAsync: async (profileData) => {
      setIsLoading(true);
      setError(null);

      try {
        // Llamar al backend: POST /api/stores
        const response = await post(API_ENDPOINTS.STORES.CREATE, {
          name: profileData.name,
          categories: profileData.categories,
        });

        // El backend devuelve { success, message, data }
        const storeData = response.data.data;

        // Guardar las categorías originales seleccionadas en localStorage
        // (el backend solo persiste ROPA/CALZADO como enum, no la lista completa)
        const categoriesSelected = profileData.categories || [];
        localStorage.setItem('store_categories', JSON.stringify(categoriesSelected));

        // Actualizar usuario en localStorage y CONTEXTO con los datos de la tienda
        const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = {
          ...existingUser,
          store: {
            ...storeData,
            categories: categoriesSelected, // Enriquecer con las categorías completas
          },
          onboarding_completed: true,
          updatedAt: new Date().toISOString()
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem('onboarding_completed', 'true');
        setUser(updatedUser); // Sincronizar con el contexto global

        return storeData;
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
      const response = await get(API_ENDPOINTS.STORES.GET_MY_STORE);

      // El backend devuelve { success, data }
      const storeData = response.data.data;

      // Actualizar localStorage y CONTEXTO con los datos actualizados
      const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = {
        ...existingUser,
        store: storeData, // Consolidar estructura: usar siempre .store
        onboarding_completed: true,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser); // Sincronizar con el contexto global

      return { data: storeData, error: null };
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