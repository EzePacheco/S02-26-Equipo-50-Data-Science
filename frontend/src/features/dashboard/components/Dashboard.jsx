import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../shared/layouts/MainLayout';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Skeleton } from '../../../shared/components/Skeleton';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useProducts } from '../../../features/products/hooks/useProducts';
import { useSales } from '../../../features/sales/hooks/useSales';
import { useCustomers } from '../../../features/customers/hooks/useCustomers';
import ROUTES from '../../../app/routes/route.config';
import {
  formatCurrency,
  getPaymentMethodLabel,
  getStockStatus,
  formatRelativeDate,
} from '../../../shared/utils/formatters';

//  Helpers

function getTodayLabel() {
  return new Date().toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}


function KpiCard({ label, value, sublabel }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {sublabel && (
          <p className="text-xs text-gray-400 mt-1">{sublabel}</p>
        )}
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <MainLayout>
      <div className="space-y-6 pb-24 md:pb-0" aria-busy="true" aria-label="Cargando datos">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-7 w-28" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-5 space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

// Componente principal 

export default function Dashboard() {
  const { user } = useAuth();
  const { products, isLoading: productsLoading } = useProducts(user?.id);
  const { sales, isLoading: salesLoading } = useSales(user?.id);
  const { customers, isLoading: customersLoading } = useCustomers(user?.id);

  const isLoading = productsLoading || salesLoading || customersLoading;

  const metrics = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const twoMonthsAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);

    const todaySales = sales.filter((s) => new Date(s.created_at) >= today);
    const monthSales = sales.filter((s) => new Date(s.created_at) >= monthAgo);
    const prevMonthSales = sales.filter(
      (s) =>
        new Date(s.created_at) >= twoMonthsAgo &&
        new Date(s.created_at) < monthAgo
    );

    const todayTotal = todaySales.reduce((sum, s) => sum + Number(s.total), 0);
    const monthTotal = monthSales.reduce((sum, s) => sum + Number(s.total), 0);
    const prevMonthTotal = prevMonthSales.reduce(
      (sum, s) => sum + Number(s.total),
      0
    );

    const monthChange =
      prevMonthTotal > 0
        ? ((monthTotal - prevMonthTotal) / prevMonthTotal) * 100
        : 0;

    // Ganancia estimada del mes
    let monthProfit = 0;
    monthSales.forEach((sale) => {
      sale.sale_items?.forEach((item) => {
        const cost = Number(item.products?.purchase_price ?? 0);
        const price = Number(item.unit_price);
        monthProfit += (price - cost) * item.quantity;
      });
    });

    // Stock bajo
    const lowStockProducts = products.filter(
      (p) => getStockStatus(p.stock, p.min_stock) !== 'good'
    );

    // Ventas recientes
    const recentSales = [...sales]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);

    return {
      todayTotal,
      todaySalesCount: todaySales.length,
      monthTotal,
      monthChange,
      monthProfit,
      lowStockCount: lowStockProducts.length,
      recentSales,
    };
  }, [sales, products]);

  if (isLoading) return <LoadingState />;

  const firstName = user?.name?.split(' ')[0] ?? 'bienvenido';

  return (
    <MainLayout>
      <div className="space-y-6 pb-24 md:pb-0">

        {/* Saludo */}
        <section aria-label="Saludo">
          <h1 className="text-2xl font-bold text-gray-900">
            Hola, {firstName}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5 capitalize">
            {getTodayLabel()}
          </p>
        </section>

        {/* KPIs */}
        <section
          aria-label="Resumen de ventas"
          className="grid gap-4 grid-cols-1 sm:grid-cols-3"
        >
          <KpiCard
            label="Ventas de hoy"
            value={formatCurrency(metrics.todayTotal)}
            sublabel={
              metrics.todaySalesCount === 0
                ? 'Sin ventas aún'
                : `${metrics.todaySalesCount} ${metrics.todaySalesCount === 1 ? 'venta' : 'ventas'}`
            }
          />
          <KpiCard
            label="Ventas del mes"
            value={formatCurrency(metrics.monthTotal)}
            sublabel={
              metrics.monthChange === 0
                ? 'Sin datos del mes anterior'
                : metrics.monthChange > 0
                  ? `↑ ${Math.abs(metrics.monthChange).toFixed(0)}% vs mes anterior`
                  : `↓ ${Math.abs(metrics.monthChange).toFixed(0)}% vs mes anterior`
            }
          />
          <KpiCard
            label="Ganancia estimada"
            value={formatCurrency(metrics.monthProfit)}
            sublabel="Este mes"
          />
        </section>

        {/* Alerta de stock bajo */}
        {metrics.lowStockCount > 0 && (
          <section aria-label="Alerta de inventario">
            <div
              role="alert"
              aria-live="polite"
              className="flex items-center justify-between gap-4 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4"
            >
              <div>
                <p className="font-semibold text-orange-800">
                  Stock bajo en{' '}
                  {metrics.lowStockCount === 1
                    ? '1 producto'
                    : `${metrics.lowStockCount} productos`}
                </p>
                <p className="text-sm text-orange-600 mt-0.5">
                  Revisá tu inventario para evitar quedarte sin mercadería.
                </p>
              </div>
              <Link
                to={ROUTES.INVENTORY}
                className="shrink-0 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors"
                aria-label="Ver inventario con stock bajo"
              >
                Ver inventario
              </Link>
            </div>
          </section>
        )}

        {/* Actividad reciente */}
        <section aria-label="Últimas ventas">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Últimas ventas
          </h2>

          {metrics.recentSales.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <ul role="list">
                  {metrics.recentSales.map((sale, index) => {
                    const isLast = index === metrics.recentSales.length - 1;
                    return (
                      <li
                        key={sale.id}
                        className={`flex items-center justify-between px-5 py-4 ${!isLast ? 'border-b border-gray-100' : ''
                          }`}
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(sale.total)}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {getPaymentMethodLabel(sale.payment_method)}
                            {sale.customers?.name
                              ? ` · ${sale.customers.name}`
                              : ''}
                          </p>
                        </div>
                        <span
                          className="text-sm text-gray-400 shrink-0 ml-4"
                          aria-label={`Hace ${formatRelativeDate(sale.created_at)}`}
                        >
                          {formatRelativeDate(sale.created_at)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="px-5 py-3 border-t border-gray-100">
                  <Link
                    to={ROUTES.SALES}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    aria-label="Ver todas las ventas"
                  >
                    Ver todas las ventas →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 mb-4">
                  Todavía no registraste ninguna venta.
                </p>
                <Button size="sm" to={ROUTES.SALES}>
                  Registrar primera venta
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

      </div>
    </MainLayout>
  );
}