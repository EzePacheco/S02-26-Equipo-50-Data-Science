// useAuth.js
// Custom hook for authentication logic - connected to backend
import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/authApi';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await authApi.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      authApi.getCurrentUser().then((userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }).catch(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      });
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      const userData = await authApi.login({ email, password });
      setUser(userData);
      setIsAuthenticated(true);
      return { user: userData, error: null };
    } catch (error) {
      return { user: null, error: error.message || 'Credenciales inválidas' };
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const userData = await authApi.register({ name, email, password });
      setUser(userData);
      setIsAuthenticated(true);
      return { user: userData, error: null };
    } catch (error) {
      return { user: null, error: error.message || 'Error al crear cuenta' };
    }
  };

  const signUpWithPhone = async (phone, password) => {
    return { data: null, error: { message: 'Registro con teléfono no implementado' } };
  };

  const signInWithFacebook = async () => {
    return { data: null, error: { message: 'Login con Facebook no implementado' } };
  };

  const signOut = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Ignore logout errors
    }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('onboarding_completed');
  };

  const refreshUser = async () => {
    try {
      const userData = await authApi.getCurrentUser();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return null;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signUpWithPhone,
    signInWithFacebook,
    signOut,
    refreshUser,
  };
};

export default useAuth;
