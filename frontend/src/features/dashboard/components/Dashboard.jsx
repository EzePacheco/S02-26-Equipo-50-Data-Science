import MainLayout from '../../shared/components/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../shared/components/Card';
import { Badge } from '../../shared/components/Badge';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign,
  AlertTriangle,
  Users,
  Calendar
} from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Dashboard() {
  // TODO: Conectar con hooks reales cuando estén listos

  const metrics = {
    todayTotal: 450.50,
    todaySales: 8,
    weekTotal: 2340.75,
    weekSales: 42,
    monthTotal: 8950.25,
    monthSales: 156,
    totalProducts: 87,
    lowStockProducts: 5
  };

  const lowStockItems = [
    { id: 1, name: 'Polo Nike', quantity: 2 },
    { id: 2, name: 'Jean Levi\'s', quantity: 1 },
    { id: 3, name: 'Zapatillas Adidas', quantity: 2 },
  ];

  const topProducts = [
    { id: 1, name: 'Polo básico', sales: 24, total: 480 },
    { id: 2, name: 'Jean slim fit', sales: 18, total: 1260 },
    { id: 3, name: 'Zapatillas running', sales: 12, total: 1440 },
  ];

  const formatPrice = (price) => `S/ ${price.toFixed(2)}`;

  return (
    <MainLayout>
      <div className="space-y-6 pb-20 md:pb-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Resumen de tu negocio</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Ventas hoy" value={formatPrice(metrics.todayTotal)} icon={<DollarSign className="w-5 h-5" />} subtitle={`${metrics.todaySales} ventas`} iconBg="bg-green-100" iconColor="text-green-600" />
          <MetricCard title="Esta semana" value={formatPrice(metrics.weekTotal)} icon={<Calendar className="w-5 h-5" />} subtitle={`${metrics.weekSales} ventas`} iconBg="bg-blue-100" iconColor="text-blue-600" />
          <MetricCard title="Este mes" value={formatPrice(metrics.monthTotal)} icon={<ShoppingCart className="w-5 h-5" />} subtitle={`${metrics.monthSales} ventas`} iconBg="bg-purple-100" iconColor="text-purple-600" />
          <MetricCard title="Productos" value={metrics.totalProducts.toString()} icon={<Package className="w-5 h-5" />} subtitle={metrics.lowStockProducts > 0 ? `${metrics.lowStockProducts} con stock bajo` : 'Stock OK'} iconBg={metrics.lowStockProducts > 0 ? 'bg-red-100' : 'bg-gray-100'} iconColor={metrics.lowStockProducts > 0 ? 'text-red-600' : 'text-gray-600'} />
        </div>

        {metrics.lowStockProducts > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                Productos con stock bajo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {lowStockItems.map(product => (
                  <Badge key={product.id} variant="outline" className="border-red-300 text-red-700">
                    {product.name} ({product.quantity})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Productos más vendidos (mes)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} unidades</p>
                  </div>
                  <span className="font-semibold text-blue-600">{formatPrice(product.total)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

function MetricCard({ title, value, icon, subtitle, iconBg, iconColor }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={cn('p-3 rounded-xl', iconBg, iconColor)}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}