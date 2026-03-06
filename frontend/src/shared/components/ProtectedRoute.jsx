import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

/**
 * Componente que protege rutas requiriendo autenticación
 * Si el usuario no está autenticado, redirige a /login
 * Si está cargando, muestra un spinner
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Si no está autenticado, redirige a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza el componente
  return children;
};

export default ProtectedRoute;
