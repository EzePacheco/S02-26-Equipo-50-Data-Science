// AppProviders.jsx
// Main context providers wrapper

import { BrowserRouter } from 'react-router-dom';
// TODO: Importar otros providers cuando se creen
// import { AuthProvider } from '../features/auth/context/AuthContext';
// import { ThemeProvider } from './ThemeProvider';

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      {/* TODO: Agregar otros providers */}
      {children}
    </BrowserRouter>
  );
};

export default AppProviders;
