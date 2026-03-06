// src/features/sales/components/Sales.jsx
import { useState, useEffect } from 'react';

import { Card, CardContent } from '../../../shared/components/Card';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Label } from '../../../shared/components/Label';
import { Skeleton } from '../../../shared/components/Skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/components/Dialog';
import { useSales, PAYMENT_METHODS } from '../hooks/useSales';
import { useInventory } from '../../inventory/hooks/useInventory';
import { useCustomers } from '../../customers/hooks/useCustomers';
import { cn } from '../../../shared/utils/cn';
import { formatCurrency, getPaymentMethodLabel } from '../../../shared/utils/formatters';
import { toast } from '../../../shared/hooks/useToast';
import { Plus, ShoppingCart, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SaleForm from './SaleForm';
import imgYape from '../../../assets/yape-logo-fondo-transparente.png';
import imgPlin from '../../../assets/plin-logo.png';
import imgEfectivo from '../../../assets/efectivo.png';
import imgTarjeta from '../../../assets/tarjeta.png';

export default function Sales() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [timeFilter, setTimeFilter] = useState('today');
    const [customDate, setCustomDate] = useState(() => new Date().toISOString().split('T')[0]);
    const { sales, isLoading, totalSales, addSale, refresh } = useSales(timeFilter, customDate);

    const PAYMENT_IMAGES = {
        efectivo: imgEfectivo,
        tarjeta: imgTarjeta,
        yape: imgYape,
        plin: imgPlin,
    };

    const formatTime = (date) => {
        const d = new Date(date);
        return d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    };

    const getDisplayDateTitle = () => {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        if (timeFilter === 'custom' && customDate) {
            const d = new Date(customDate + 'T00:00:00');
            return `${days[d.getDay()]} ${d.getDate()} de ${months[d.getMonth()]}`;
        }

        const now = new Date();
        if (timeFilter === 'today') return `${days[now.getDay()]} ${now.getDate()} de ${months[now.getMonth()]}`;

        if (timeFilter === 'yesterday') {
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            return `${days[yesterday.getDay()]} ${yesterday.getDate()} de ${months[yesterday.getMonth()]}`;
        }

        if (timeFilter === 'this_week') return 'Esta semana';
        if (timeFilter === 'this_month') return `${months[now.getMonth()]} de ${now.getFullYear()}`;
        if (timeFilter === 'this_year') return `Año ${now.getFullYear()}`;

        return '';
    };

    const getTitleLabel = () => {
        switch (timeFilter) {
            case 'today': return 'Ventas de hoy';
            case 'yesterday': return 'Ventas de ayer';
            case 'this_week': return 'Ventas de la semana';
            case 'this_month': return 'Ventas del mes';
            case 'this_year': return 'Ventas del año';
            case 'custom': return 'Ventas por fecha';
            default: return 'Ventas';
        }
    };

    const handleSaleCreated = () => {
        setIsAddDialogOpen(false);
        refresh();
        toast.success('¡Anotado!', 'La venta se registró correctamente');
    };

    useEffect(() => {
        const handleGlobalSale = () => refresh();
        window.addEventListener('sale-created', handleGlobalSale);
        return () => window.removeEventListener('sale-created', handleGlobalSale);
    }, [refresh]);

    if (isLoading) {
        return (
            <>
                <div className="max-w-7xl mx-auto space-y-8 px-4 md:px-6 lg:px-8 pb-24 md:pb-6">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-24 w-full" />
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i}>
                                <CardContent className="p-4">
                                    <Skeleton className="h-20" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto space-y-8 px-4 md:px-6 lg:px-8 pb-24 md:pb-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{getTitleLabel()}</h1>
                            <p className="text-gray-500">{getDisplayDateTitle()}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4 sm:mt-2">
                            <Select value={timeFilter} onValueChange={setTimeFilter}>
                                <SelectTrigger className="w-full sm:w-[180px] bg-white">
                                    <SelectValue placeholder="Hoy">
                                        {{
                                            'today': 'Hoy',
                                            'yesterday': 'Ayer',
                                            'this_week': 'Esta semana',
                                            'this_month': 'Este mes',
                                            'this_year': 'Este año',
                                            'custom': 'Fecha específica'
                                        }[timeFilter] || 'Hoy'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="today">Hoy</SelectItem>
                                    <SelectItem value="yesterday">Ayer</SelectItem>
                                    <SelectItem value="this_week">Esta semana</SelectItem>
                                    <SelectItem value="this_month">Este mes</SelectItem>
                                    <SelectItem value="this_year">Este año</SelectItem>
                                    <SelectItem value="custom">Fecha específica</SelectItem>
                                </SelectContent>
                            </Select>
                            {timeFilter === 'custom' && (
                                <Input
                                    type="date"
                                    value={customDate}
                                    onChange={(e) => setCustomDate(e.target.value)}
                                    className="w-full sm:w-[180px]"
                                />
                            )}
                        </div>
                    </div>

                    <Card className="bg-emerald-600 text-white border-0 shadow-lg shadow-emerald-100">
                        <CardContent className="py-4 px-6">
                            <p className="text-sm opacity-90">Total vendido</p>
                            <p className="text-3xl font-bold text-black">{formatCurrency(totalSales)}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sales List */}
                {sales.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center pt-12">
                            <ShoppingCart className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900">No hay ventas registradas</h3>
                            <p className="text-gray-500 mb-4">
                                No se encontraron ventas para este periodo
                            </p>
                            <Button
                                onClick={() => setIsAddDialogOpen(true)}
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Nueva venta
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {sales.map((sale) => (
                                <motion.div
                                    key={sale.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between gap-3 pt-5">
                                                <div className="flex-1 min-w-0 text-left">
                                                    <div className="space-y-1">
                                                        {sale.items && sale.items.length > 0 ? (
                                                            sale.items.map((item, idx) => (
                                                                <div key={idx}>
                                                                    <h3 className="font-semibold text-gray-900">
                                                                        {item.productName || 'Producto'}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-500">
                                                                        {item.quantity} x {formatCurrency(item.unitPrice)}
                                                                    </p>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <h3 className="font-semibold text-gray-900">Venta</h3>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                        {(sale.paymentMethod || sale.payment_method) && (
                                                            <Badge
                                                                variant="outline"
                                                                className="bg-white border-gray-100 shadow-sm text-gray-700 font-bold px-2 py-1 flex items-center gap-2"
                                                            >
                                                                {PAYMENT_IMAGES[(sale.paymentMethod || sale.payment_method).toLowerCase()] && (
                                                                    <div className="w-5 h-5 flex items-center justify-center bg-white rounded p-0.5 border border-gray-50">
                                                                        <img
                                                                            src={PAYMENT_IMAGES[(sale.paymentMethod || sale.payment_method).toLowerCase()]}
                                                                            alt=""
                                                                            className="w-full h-full object-contain"
                                                                        />
                                                                    </div>
                                                                )}
                                                                <span className="text-[10px] uppercase tracking-wider">
                                                                    {getPaymentMethodLabel(sale.paymentMethod || sale.payment_method)}
                                                                </span>
                                                            </Badge>
                                                        )}
                                                        {(sale.customer || sale.customerName) && (
                                                            <Badge variant="outline" className="text-xs">
                                                                {sale.customer?.name || sale.customerName}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right shrink-0 flex flex-col items-end gap-1">
                                                    <p className="text-lg font-bold text-emerald-600">
                                                        {formatCurrency(sale.totalAmount || sale.total_price)}
                                                    </p>
                                                    <span className="text-xs text-gray-400">
                                                        {formatTime(sale.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Add Sale Dialog (keeping for the empty state button) */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-0">
                        <DialogHeader className="p-6 pb-0">
                            <DialogTitle>Anotar una venta</DialogTitle>
                        </DialogHeader>
                        <div className="p-6 pt-4">
                            <SaleForm
                                onSubmit={(data) => {
                                    return addSale.mutateAsync({
                                        customerId: data.customerId,
                                        customerName: data.customerName,
                                        paymentMethod: data.paymentMethod,
                                        items: [{
                                            productId: data.productId,
                                            productName: data.productName,
                                            quantity: data.quantity,
                                            unitPrice: data.unitPrice
                                        }],
                                    });
                                }}
                                isLoading={addSale.isPending}
                                onSuccess={handleSaleCreated}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}


