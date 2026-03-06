import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../features/auth/context/AuthContext';

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
