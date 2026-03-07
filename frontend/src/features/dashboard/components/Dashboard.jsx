import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Skeleton } from '../../../shared/components/Skeleton';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useInventory } from '../../../features/inventory/hooks/useInventory';
import { useSales } from '../../../features/sales/hooks/useSales';
import ROUTES from '../../../app/routes/route.config';
import {
  formatCurrency,
  getPaymentMethodLabel,
  formatRelativeDate,
} from '../../../shared/utils/formatters';
import { Badge } from '../../../shared/components/Badge';
import imgYape from '../../../assets/yape-logo-fondo-transparente.png';
import imgPlin from '../../../assets/plin-logo.png';
import imgEfectivo from '../../../assets/efectivo.png';
import imgTarjeta from '../../../assets/tarjeta.png';

const PAYMENT_IMAGES = {
  efectivo: imgEfectivo,
  tarjeta: imgTarjeta,
  yape: imgYape,
  plin: imgPlin,
};

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
    <Card className="rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-6 pt-5">
        <p className="text-sm font-medium text-gray-500 mb-1">
          {label}</p>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">
          {value}
        </p>
        {sublabel && (
          <p className="text-xs text-gray-500 mt-2">{sublabel}</p>
        )}
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <>
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
    </>
  );
}

// Componente principal 

export default function Dashboard() {
  const { user } = useAuth();
  const { allProducts: products, isLoading: productsLoading, refresh: refreshProducts } = useInventory();
  const { sales, isLoading: salesLoading, refresh: refreshSales } = useSales('all');

  const isLoading = productsLoading || salesLoading;

  useEffect(() => {
    const handleGlobalSale = () => {
      refreshProducts();
      refreshSales();
    };
    window.addEventListener('sale-created', handleGlobalSale);
    return () => window.removeEventListener('sale-created', handleGlobalSale);
  }, [refreshProducts, refreshSales]);

  const metrics = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const twoMonthsAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);

    const todaySales = sales.filter((s) => new Date(s.created_at || s.createdAt) >= today);
    const monthSales = sales.filter((s) => new Date(s.created_at || s.createdAt) >= monthAgo);
    const prevMonthSales = sales.filter(
      (s) =>
        new Date(s.created_at || s.createdAt) >= twoMonthsAgo &&
        new Date(s.created_at || s.createdAt) < monthAgo
    );

    const todayTotal = todaySales.reduce((sum, s) => sum + Number(s.total_price || s.totalAmount || 0), 0);
    const monthTotal = monthSales.reduce((sum, s) => sum + Number(s.total_price || s.totalAmount || 0), 0);
    const prevMonthTotal = prevMonthSales.reduce(
      (sum, s) => sum + Number(s.total_price || s.totalAmount || 0),
      0
    );

    const monthChange =
      prevMonthTotal > 0
        ? ((monthTotal - prevMonthTotal) / prevMonthTotal) * 100
        : 0;

    // Ganancia (actualmente = ingresos totales, sin costo de compra disponible)
    const monthProfit = monthSales.reduce((sum, sale) => {
      return sum + (Number(sale.total_price || sale.totalAmount || 0));
    }, 0);

    // Stock bajo (usamos el umbral estándar de 3 unidades definido en Inventory)
    const lowStockProducts = products.filter(
      (p) => (p.inventory?.quantity ?? 0) < 3
    );

    // Ventas recientes
    const recentSales = [...sales]
      .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt))
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
    <>
      <div className="space-y-10 px-4 md:px-6 lg:px-8 pb-24 md:pb-6">

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
            label="Tu ganancia del mes"
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
              className="flex items-center justify-between gap-6 rounded-2xl border border-orange-200 bg-orange-50 px-6 py-5 shadow-sm"
            >
              <div>
                <p className="font-semibold text-orange-800">
                  ¡Falta mercadería! en{' '}
                  {metrics.lowStockCount === 1
                    ? '1 producto'
                    : `${metrics.lowStockCount} productos`}
                </p>
                <p className="text-sm text-orange-600 mt-0.5">
                  Revisa tu lista para evitar quedarte sin qué vender.
                </p>
              </div>
              <Link
                to={ROUTES.INVENTORY}
                className="shrink-0 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors"
                aria-label="Ver productos por agotarse"
              >
                Ver mis productos
              </Link>
            </div>
          </section>
        )}

        {/* Actividad reciente */}
        <section aria-label="Últimas ventas">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Ventas recientes
          </h2>

          {metrics.recentSales.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <ul role="list">
                  {metrics.recentSales.map((sale, index) => {
                    const isLast = index === metrics.recentSales.length - 1;
                    const productNames = sale.items && sale.items.length > 0
                      ? sale.items.map(i => i.productName).join(', ')
                      : null;
                    const customerName = sale.customer?.name || sale.customerName || null;
                    return (
                      <li
                        key={sale.id}
                        className={`flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition ${!isLast ? 'border-b border-gray-100' : ''
                          }`}
                      >
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 text-lg">
                            {formatCurrency(sale.totalAmount || sale.total_price)}
                          </p>
                          {productNames && (
                            <p className="text-sm text-gray-700 mt-0.5">{productNames}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {(sale.paymentMethod || sale.payment_method) && (
                              <Badge variant="outline" className="text-[10px] sm:text-xs flex items-center gap-1.5 py-1 px-2.5 bg-white shadow-sm border-gray-100 font-bold text-gray-700">
                                {PAYMENT_IMAGES[(sale.paymentMethod || sale.payment_method).toLowerCase()] && (
                                  <div className="w-5 h-5 flex items-center justify-center bg-white rounded-md p-0.5 border border-gray-50">
                                    <img
                                      src={PAYMENT_IMAGES[(sale.paymentMethod || sale.payment_method).toLowerCase()]}
                                      alt=""
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                )}
                                <span className="uppercase tracking-tight">
                                  {getPaymentMethodLabel(sale.paymentMethod || sale.payment_method)}
                                </span>
                              </Badge>
                            )}
                            {customerName && (
                              <Badge variant="outline" className="text-xs">
                                {customerName}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span
                          className="text-sm text-gray-400 shrink-0 ml-4 whitespace-nowrap"
                          aria-label={`Hace ${formatRelativeDate(sale.createdAt)}`}
                        >
                          {formatRelativeDate(sale.createdAt)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="px-5 py-3 border-t border-gray-100">
                  <Link
                    to={ROUTES.SALES}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    aria-label="Ver todas las ventas"
                  >
                    Ver todas las ventas →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 pt-5 text-center">
                <p className="text-gray-500 mb-4">
                  Todavía no registraste ninguna venta.
                </p>
                <Button size="sm" to={ROUTES.SALES} className="bg-emerald-600 hover:bg-emerald-700">
                  Registrar primera venta
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

      </div>
    </>
  );
}