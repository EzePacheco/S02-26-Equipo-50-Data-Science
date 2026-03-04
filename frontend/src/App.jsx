import './App.css'
import AppProviders from './app/providers/AppProviders';
import AppRoutes from './app/routes/AppRoutes';
import { Toaster } from './shared/components/Toaster';

function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <Toaster />
    </AppProviders>
  )
}

export default App