// useAuth.js
// Custom hook for authentication logic
import { useState, useEffect } from 'react';

export const useAuth = () => {
  // Estado del usuario
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login
  const signIn = async (email, password) => {
    try {
      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email && password) {
        const userData = {
          id: '1',
          email,
          name: 'Usuario Demo'
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        return { user: userData, error: null };
      } else {
        return { user: null, error: 'Credenciales inválidas' };
      }

    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  // Registro
  const signUp = async (email, password, name = 'Usuario Demo') => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email && password) {
        const userData = {
          id: '1',
          email,
          name
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        return { user: userData, error: null };
      } else {
        return { user: null, error: 'Datos incompletos' };
      }

    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  // Registro con teléfono
  const signUpWithPhone = async (phone, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (phone && password) {
        const userData = {
          id: '1',
          phone,
          name: 'Usuario Demo'
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        return { data: { user: userData, session: true }, error: null };
      } else {
        return { data: null, error: { message: 'Datos incompletos' } };
      }

    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  };

  // Login con Facebook (solo visual)
  const signInWithFacebook = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        id: '1',
        email: 'facebook@demo.com',
        name: 'Usuario Facebook'
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return { data: { user: userData }, error: null };

    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  };

  // Logout
  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signUpWithPhone,
    signInWithFacebook,
    signOut
  };
};

export default useAuth;
