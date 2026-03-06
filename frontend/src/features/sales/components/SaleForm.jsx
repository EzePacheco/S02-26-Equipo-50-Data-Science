import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Label } from '../../../shared/components/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/Select';
import { useInventory } from '../../inventory/hooks/useInventory';
import { useCustomers } from '../../customers/hooks/useCustomers';
import { cn } from '../../../shared/utils/cn';
import { PAYMENT_METHODS } from '../hooks/useSales';
import { ShoppingCart, Loader2 } from 'lucide-react';

import imgYape from '../../../assets/yape-logo-fondo-transparente.png';
import imgPlin from '../../../assets/plin-logo.png';
import imgEfectivo from '../../../assets/efectivo.png';
import imgTarjeta from '../../../assets/tarjeta.png';

export default function SaleForm({ onSubmit, isLoading, onSuccess }) {
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
      alert(`No te alcanza, solo tienes ${stock} unidades`);
      return;
    }

    try {
      await onSubmit({
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
    } catch (error) {
      console.error("Error submitting sale:", error);
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
                      ({product.inventory?.quantity ?? 0} disponibles)
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
              Tienes {selectedProduct.inventory?.quantity ?? 0} unidades ahora
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
                  ? 'border-emerald-500 bg-emerald-50 shadow-sm'
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
                paymentMethod === value ? 'text-emerald-600' : 'text-gray-600'
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
          <span className="text-2xl font-bold text-emerald-600">
            S/ {totalPrice.toFixed(2)}
          </span>
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-full h-14 text-lg rounded-xl bg-emerald-600 hover:bg-emerald-700"
        disabled={isLoading || !selectedProductId}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Anotando...
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Anotar venta
          </>
        )}
      </Button>
    </form>
  );
}
