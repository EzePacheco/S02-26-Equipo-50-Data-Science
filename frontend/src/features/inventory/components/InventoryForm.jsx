// InventoryForm.jsx
// Form component for adding/editing inventory products

import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Label } from '../../../shared/components/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/Select';
import { CATEGORIES } from '../hooks/useInventory';
import { Loader2 } from 'lucide-react';

function InventoryForm({ initialData, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    size: initialData?.size || '',
    color: initialData?.color || '',
    quantity: initialData?.quantity ?? 0,
    price: initialData?.price ?? initialData?.sale_price ?? 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate SKU automatically: [CAT]-[3 Letters Name]-[Short Color]-[Size]
    const catPart = (formData.category || 'GEN').substring(0, 3).toUpperCase();
    const namePart = formData.name.trim().substring(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, '');
    const colorPart = (formData.color || 'NA').trim().substring(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, '');
    const sizePart = (formData.size || 'NA').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    // Added a short random suffix to ensure uniqueness in the database
    const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();

    const sku = `${catPart}-${namePart}-${colorPart}-${sizePart}-${suffix}`;

    const { quantity, ...rest } = formData;
    onSubmit({
      ...rest,
      sku,
      initialStock: quantity
    });
  };

  const set = (field) => (e) =>
    setFormData((d) => ({ ...d, [field]: e.target.value }));

  const setNum = (field, parseFn) => (e) =>
    setFormData((d) => ({ ...d, [field]: parseFn(e.target.value) || 0 }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="inv-name">Nombre del producto *</Label>
        <Input
          id="inv-name"
          value={formData.name}
          onChange={set('name')}
          placeholder="Ej: Polo manga corta"
          required
          className="h-12"
        />
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <Label htmlFor="inv-category">Categoría *</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData((d) => ({ ...d, category: value }))}
          required
        >
          <SelectTrigger id="inv-category" className="h-12">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Talla y Color */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="inv-size">Talla</Label>
          <Input
            id="inv-size"
            value={formData.size}
            onChange={set('size')}
            placeholder="S, M, 34, 36..."
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inv-color">Color</Label>
          <Input
            id="inv-color"
            value={formData.color}
            onChange={set('color')}
            placeholder="Negro, Azul..."
            className="h-12"
          />
        </div>
      </div>

      {/* Cantidad */}
      <div className="space-y-2">
        <Label htmlFor="inv-quantity">Cantidad en stock *</Label>
        <Input
          id="inv-quantity"
          type="number"
          min="0"
          value={formData.quantity}
          onChange={setNum('quantity', parseInt)}
          required
          className="h-12"
        />
      </div>

      {/* Precio */}
      <div className="space-y-2">
        <Label htmlFor="inv-sale-price">Precio de venta (S/) *</Label>
        <Input
          id="inv-sale-price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={setNum('price', parseFloat)}
          required
          className="h-12"
        />
      </div>

      {/* Acciones */}
      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        )}
        <Button type="submit" className="flex-1 h-12" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            'Guardar producto'
          )}
        </Button>
      </div>
    </form>
  );
}

export default InventoryForm;
