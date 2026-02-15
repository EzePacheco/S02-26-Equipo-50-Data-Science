import { Link } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { Card, CardContent } from '../../shared/components/Card';
import ROUTES from '../../app/routes/route.config';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Smartphone, 
  Zap,
  ArrowRight,
  Check,
  Store
} from 'lucide-react';

const FEATURES = [
  {
    icon: Package,
    title: 'Control de inventario',
    description: 'Registra productos por talla, color y categoría.',
  },
  {
    icon: ShoppingCart,
    title: 'Ventas rápidas',
    description: 'Registra ventas en segundos. Efectivo, Yape, Plin, otros.',
  },
  {
    icon: Users,
    title: 'Gestión de clientes',
    description: 'Guarda datos de tus clientes y su historial de compras.',
  },
  {
    icon: BarChart3,
    title: 'Métricas claras',
    description: 'Visualiza tus ventas del día, semana y mes en un resumen',
  },
  {
    icon: Smartphone,
    title: 'Desde tu celular',
    description: 'Diseñado para funcionar perfecto desde cualquier equipo movil.',
  },
  {
    icon: Zap,
    title: 'Simple y rápido',
    description: 'Sin complicaciones. Empieza a usarlo en menos de 1 minutos.',
  },
];

const BENEFITS = [
  'xxx',
  'Funciona desde cualquier dispositivo',
  'xxx',
  'xxx',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">Pordefinir</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" to={ROUTES.LOGIN}>
              Iniciar sesión
            </Button>
            <Button size="sm" to={ROUTES.REGISTER}>
              Crear cuenta
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              Para tiendas de ropa y calzado en Perú
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Tu tienda organizada,{' '}
              <span className="text-blue-600">tus ventas en orden</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
              Controla tu mercaderia, registra tus ventas y guarda tus clientes desde tu celular. Simple, rápido y hecho para ti.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base" to={ROUTES.REGISTER}>
                Empieza gratis
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base" to={ROUTES.LOGIN}>
                Ya tengo cuenta
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl pointer-events-none opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-100 rounded-full blur-3xl pointer-events-none opacity-30" />
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Todo lo que necesitas para tu negocio
            </h2>
            <p className="mt-3 text-gray-600 max-w-md mx-auto">
              Pensado para tí
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="border-0 bg-blue-600 text-white overflow-hidden relative">
            <CardContent className="p-8 md:p-12 text-center space-y-6 relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Empieza a organizar tu tienda hoy
              </h2>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-50">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Button 
                size="lg" 
                variant="secondary" 
                className="gap-2 text-base font-semibold bg-white text-blue-600 hover:bg-gray-100" 
                to={ROUTES.REGISTER}
              >
                Crear cuenta gratis
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700" />
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-gray-900">Pordefinir</span>
          </div>
          <p>© {new Date().getFullYear()} Pordefinir.</p>
        </div>
      </footer>
    </div>
  );
}