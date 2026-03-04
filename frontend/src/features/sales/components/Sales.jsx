// src/features/sales/components/Sales.jsx
import { useState, useEffect } from 'react';
import MainLayout from '../../../shared/layouts/MainLayout';
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
import { formatCurrency } from '../../../shared/utils/formatters';
import { toast } from '../../../shared/hooks/useToast';
import { Plus, ShoppingCart, Loader2, X } from 'lucide-react';
import imgYape from '../../../assets/yape-logo-fondo-transparente.png';
import imgPlin from '../../../assets/plin-logo.png';
import imgEfectivo from '../../../assets/efectivo.png';
import imgTarjeta from '../../../assets/tarjeta.png';

export default function Sales() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { sales, isLoading, totalSales, addSale, refresh } = useSales('today');

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

    const getTodayDate = () => {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const now = new Date();
        return `${days[now.getDay()]} ${now.getDate()} de ${months[now.getMonth()]}`;
    };

    const handleSaleCreated = () => {
        setIsAddDialogOpen(false);
        refresh();
        toast.success('¡Venta registrada!', 'La venta se registró correctamente');
    };

    if (isLoading) {
        return (
            <MainLayout>
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
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto space-y-8 px-4 md:px-6 lg:px-8 pb-24 md:pb-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Ventas del día</h1>
                        <p className="text-gray-500">{getTodayDate()}</p>
                    </div>

                    <Card className="bg-blue-600 text-white border-0">
                        <CardContent className="py-4 px-6">
                            <p className="text-sm opacity-90">Total vendido hoy</p>
                            <p className="text-3xl font-bold text-black">{formatCurrency(totalSales)}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sales List */}
                {sales.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center pt-12">
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
                                                {sale.customer && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {sale.customer.name}
                                                    </Badge>
                                                )}
                                                <span className="text-xs text-gray-400">
                                                    {formatTime(sale.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-blue-600">
                                                {formatCurrency(sale.totalAmount || sale.total_price)}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Floating Action Button */}
                <Button
                    className="fixed bottom-20 right-4 md:bottom-8 md:right-8 h-14 w-14 rounded-full shadow-lg hover:scale-105 transition"
                    onClick={() => setIsAddDialogOpen(true)}
                >
                    <Plus className="w-6 h-6" />
                </Button>

                {/* Add Sale Dialog */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-0">
                        <DialogHeader>
                            <DialogTitle>Registrar venta</DialogTitle>
                        </DialogHeader>
                        <SaleForm
                            onSubmit={(data) => {
                                addSale.mutate({
                                    customerId: data.customerId,
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
                    </DialogContent>
                </Dialog>
            </div>
        </MainLayout>
    );
}

function SaleForm({ onSubmit, isLoading, onSuccess }) {
    const { allProducts: products } = useInventory();
    const { customers } = useCustomers();

    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('efectivo');
    const [selectedCustomerId, setSelectedCustomerId] = useState('');

    const selectedProduct = products.find(p => p.id === selectedProductId);
    const totalPrice = (quantity || 0) * (unitPrice || 0);

    useEffect(() => {
        if (selectedProduct) {
            setUnitPrice(Number(selectedProduct.price) || 0);
        }
    }, [selectedProduct]);

    const handleProductChange = (productId) => {
        setSelectedProductId(productId);
        const product = products.find(p => p.id === productId);
        if (product) {
            setUnitPrice(Number(product.price) || 0);
            setQuantity(1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProduct) return;

        const stock = selectedProduct.inventory?.quantity ?? 0;
        if (quantity > stock) {
            alert(`Solo hay ${stock} unidades disponibles`);
            return;
        }

        onSubmit({
            productId: selectedProductId,
            customerId: selectedCustomerId || null,
            productName: selectedProduct.name,
            customerName: customers.find(c => c.id === selectedCustomerId)?.name || null,
            quantity,
            unitPrice: unitPrice,
            purchasePrice: selectedProduct.purchase_price || 0,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
        });

        if (onSuccess) {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-left">
                <Label>Producto *</Label>
                <div className="relative">
                    <Select value={selectedProductId} onValueChange={handleProductChange} required>
                        <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Selecciona un producto">
                                {selectedProduct?.name}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {products.filter(p => (p.inventory?.quantity ?? 0) > 0).map(product => (
                                <SelectItem key={product.id} value={product.id}>
                                    <div className="flex items-center justify-between gap-4 w-full">
                                        <span>{product.name}</span>
                                        <span className="text-gray-400 text-sm">
                                            ({product.inventory?.quantity ?? 0} en stock)
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2  text-left">
                    <Label htmlFor="quantity">Cantidad *</Label>
                    <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max={selectedProduct?.inventory?.quantity || 999}
                        value={quantity}
                        onChange={(e) => {
                            const val = e.target.value;
                            setQuantity(val === '' ? '' : parseInt(val));
                        }}
                        required
                        className="h-12 rounded-xl"
                    />
                    {selectedProduct && (
                        <p className="text-xs text-gray-500">
                            Disponible: {selectedProduct.inventory?.quantity ?? 0}
                        </p>
                    )}
                </div>
                <div className="space-y-2 text-left">
                    <Label htmlFor="unitPrice">Precio unit. (S/) *</Label>
                    <Input
                        id="unitPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={unitPrice}
                        onChange={(e) => {
                            const val = e.target.value;
                            setUnitPrice(val === '' ? '' : parseFloat(val));
                        }}
                        required
                        className="h-12 rounded-xl"
                    />
                </div>
            </div>

            <div className="space-y-2 text-left">
                <Label>Cliente (opcional)</Label>
                <div className="relative">
                    <Select
                        value={selectedCustomerId}
                        onValueChange={(val) => setSelectedCustomerId(val === 'none' ? '' : val)}
                    >
                        <SelectTrigger className="h-12 rounded-xl">
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

            {/* Payment method */}
            <div className="space-y-2 text-left">
                <Label>Método de pago</Label>
                <div className="grid grid-cols-4 gap-2">
                    {PAYMENT_METHODS.map(({ value, label }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setPaymentMethod(value)}
                            className={cn(
                                'flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all',
                                paymentMethod === value
                                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                            )}
                        >
                            <img
                                src={
                                    value === 'efectivo' ? imgEfectivo
                                        : value === 'tarjeta' ? imgTarjeta
                                            : value === 'yape' ? imgYape
                                                : imgPlin
                                }
                                alt={label}
                                className="w-8 h-8 object-contain"
                            />
                            <span className={cn(
                                'text-xs font-medium',
                                paymentMethod === value ? 'text-blue-600' : 'text-gray-600'
                            )}>
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Total */}
            <Card className="bg-gray-50 border-gray-200 rounded-xl">
                <CardContent className="py-3 pt-3 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                        S/ {totalPrice.toFixed(2)}
                    </span>
                </CardContent>
            </Card>

            <Button
                type="submit"
                className="w-full h-14 text-lg rounded-xl"
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
