// src/features/sales/components/Sales.jsx
import { useState } from 'react';
import MainLayout from '../../../shared/layouts/MainLayout';
import { Card, CardContent } from '../../../shared/components/Card';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import  Input  from '../../../shared/components/Input';
import { Label } from '../../../shared/components/Label';
import { Skeleton } from '../../../shared/components/Skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/components/Dialog';
import { useSales, PAYMENT_METHODS } from '../hooks/useSales';
import { useProducts } from '../../products/hooks/useProducts';
import { useCustomers } from '../../customers/hooks/useCustomers';
import { cn } from '../../../shared/utils/cn';
import { formatCurrency } from '../../../shared/utils/formatters';
import {
    Plus,
    ShoppingCart,
    Loader2,
    X,
    Banknote,
    CreditCard,
    Smartphone
} from 'lucide-react';

export default function Sales() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { sales, isLoading, totalSales, addSale, cancelSale } = useSales('today');

    const getPaymentIcon = (method) => {
        switch (method) {
            case 'efectivo': return <Banknote className="w-4 h-4" />;
            case 'tarjeta': return <CreditCard className="w-4 h-4" />;
            default: return <Smartphone className="w-4 h-4" />;
        }
    };

    const formatTime = (date) => {
        const d = new Date(date);
        return d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    };

    const getTodayDate = () => {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const now = new Date();
        return `${days[now.getDay()]} ${now.getDate()} de ${months[now.getMonth()]}`;
    };

    if (isLoading) {
        return (
            <MainLayout>
                <div className="space-y-6 pb-24 md:pb-0">
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
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-6 pb-24 md:pb-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Ventas del día</h1>
                        <p className="text-gray-500">{getTodayDate()}</p>
                    </div>

                    <Card className="bg-blue-600 text-white border-0">
                        <CardContent className="py-4 px-6">
                            <p className="text-sm opacity-90">Total vendido hoy</p>
                            <p className="text-3xl font-bold">{formatCurrency(totalSales)}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sales List */}
                {sales.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <ShoppingCart className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900">No hay ventas hoy</h3>
                            <p className="text-gray-500 mb-4">
                                Registra tu primera venta del día
                            </p>
                            <Button onClick={() => setIsAddDialogOpen(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Nueva venta
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {sales.map((sale) => (
                            <Card key={sale.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900">{sale.product_name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {sale.quantity} x {formatCurrency(sale.unit_price)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                <Badge variant="secondary" className="gap-1">
                                                    {getPaymentIcon(sale.payment_method)}
                                                    <span className="capitalize">{sale.payment_method}</span>
                                                </Badge>
                                                {sale.customer_name && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {sale.customer_name}
                                                    </Badge>
                                                )}
                                                <span className="text-xs text-gray-400">
                                                    {formatTime(sale.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-blue-600">
                                                {formatCurrency(sale.total_price)}
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-1"
                                                onClick={() => {
                                                    if (confirm('¿Anular esta venta?')) {
                                                        cancelSale.mutate(sale.id);
                                                    }
                                                }}
                                            >
                                                <X className="w-4 h-4 mr-1" />
                                                Anular
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Floating Action Button */}
                <Button
                    className="fixed bottom-20 right-4 md:bottom-8 md:right-8 h-14 w-14 rounded-full shadow-lg z-50"
                    onClick={() => setIsAddDialogOpen(true)}
                >
                    <Plus className="w-6 h-6" />
                </Button>

                {/* Add Sale Dialog */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Registrar venta</DialogTitle>
                        </DialogHeader>
                        <SaleForm
                            onSubmit={(data) => {
                                addSale.mutate(data);
                                setIsAddDialogOpen(false);
                            }}
                            isLoading={addSale.isPending}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </MainLayout>
    );
}

function SaleForm({ onSubmit, isLoading }) {
    const { products } = useProducts('todos');
    const { customers } = useCustomers();

    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('efectivo');
    const [selectedCustomerId, setSelectedCustomerId] = useState('');

    const selectedProduct = products.find(p => p.id === selectedProductId);
    const totalPrice = quantity * unitPrice;

    const handleProductChange = (productId) => {
        setSelectedProductId(productId);
        const product = products.find(p => p.id === productId);
        if (product) {
            setUnitPrice(Number(product.sale_price));
            setQuantity(1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedProduct) return;

        // Validar stock
        if (quantity > selectedProduct.quantity) {
            alert(`Solo hay ${selectedProduct.quantity} unidades disponibles`);
            return;
        }

        onSubmit({
            product_id: selectedProductId,
            customer_id: selectedCustomerId || null,
            product_name: selectedProduct.name,
            customer_name: customers.find(c => c.id === selectedCustomerId)?.name || null,
            quantity,
            unit_price: unitPrice,
            total_price: totalPrice,
            payment_method: paymentMethod,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>Producto *</Label>
                <div className="relative">
                    <Select value={selectedProductId} onValueChange={handleProductChange} required>
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="Selecciona un producto">
                                {selectedProduct?.name}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {products.filter(p => p.quantity > 0).map(product => (
                                <SelectItem key={product.id} value={product.id}>
                                    <div className="flex items-center justify-between gap-4 w-full">
                                        <span>{product.name}</span>
                                        <span className="text-gray-400 text-sm">
                                            ({product.quantity} en stock)
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad *</Label>
                    <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max={selectedProduct?.quantity || 999}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        required
                        className="h-12"
                    />
                    {selectedProduct && (
                        <p className="text-xs text-gray-500">
                            Disponible: {selectedProduct.quantity}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="unitPrice">Precio unit. (S/) *</Label>
                    <Input
                        id="unitPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
                        required
                        className="h-12"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Método de pago *</Label>
                <div className="grid grid-cols-2 gap-2">
                    {PAYMENT_METHODS.map(({ value, label }) => (
                        <Button
                            key={value}
                            type="button"
                            variant={paymentMethod === value ? 'default' : 'outline'}
                            className={cn(
                                'h-12',
                                paymentMethod === value && 'ring-2 ring-blue-500 ring-offset-2'
                            )}
                            onClick={() => setPaymentMethod(value)}
                        >
                            {value === 'efectivo' && <Banknote className="w-4 h-4 mr-2" />}
                            {value === 'tarjeta' && <CreditCard className="w-4 h-4 mr-2" />}
                            {(value === 'yape' || value === 'plin') && <Smartphone className="w-4 h-4 mr-2" />}
                            {label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label>Cliente (opcional)</Label>
                <div className="relative">
                    <Select
                        value={selectedCustomerId}
                        onValueChange={(val) => setSelectedCustomerId(val === 'none' ? '' : val)}
                    >
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="Selecciona o deja vacío">
                                {selectedCustomerId === 'none' || !selectedCustomerId
                                    ? undefined
                                    : customers.find(c => c.id === selectedCustomerId)?.name}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Sin cliente</SelectItem>
                            {customers.map(customer => (
                                <SelectItem key={customer.id} value={customer.id}>
                                    {customer.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Total */}
            <Card className="bg-gray-50 border-gray-200">
                <CardContent className="py-4 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                        S/ {totalPrice.toFixed(2)}
                    </span>
                </CardContent>
            </Card>

            <Button
                type="submit"
                className="w-full h-14 text-lg"
                disabled={isLoading || !selectedProductId}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Registrando...
                    </>
                ) : (
                    <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Registrar venta
                    </>
                )}
            </Button>
        </form>
    );
}
