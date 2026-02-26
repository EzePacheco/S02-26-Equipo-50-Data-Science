import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Button } from '../../shared/components/Button';
import ROUTES from '../../app/routes/route.config';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
  Store
} from 'lucide-react';
import logoDatamark from '../../assets/datamark.png';
const cn = (...classes) => classes.filter(Boolean).join(' ');

const NAV_ITEMS = [
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { path: ROUTES.INVENTORY, label: 'Inventario', icon: Package },
  { path: ROUTES.SALES, label: 'Ventas', icon: ShoppingCart },
  { path: ROUTES.CUSTOMERS, label: 'Clientes', icon: Users },
];

export default function MainLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTES.LOGIN);
  };

  const userData = user || JSON.parse(localStorage.getItem('user') || '{}');
  const storeName = userData?.store?.name || userData?.store_name || 'DATAMARK';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5 text-blue-600" />
            </div>
            <p className="font-semibold text-sm">{storeName}</p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Solo mostrar el botón de cerrar sesión en mobile (la nav inferior gestiona la navegación) */}
        {mobileMenuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-white border-b shadow-lg">
            <div className="p-2">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Cerrar sesión</span>
              </button>
            </div>
          </nav>
        )}
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r fixed left-0 top-0">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">{storeName}</p>
                <p className="text-xs text-gray-500">Gestión de tienda</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  location.pathname === path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 md:ml-64">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-40">
        <div className="flex">
          {NAV_ITEMS.slice(0, 4).map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex-1 flex flex-col items-center gap-1 py-3',
                location.pathname === path ? 'text-blue-600' : 'text-gray-500'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}