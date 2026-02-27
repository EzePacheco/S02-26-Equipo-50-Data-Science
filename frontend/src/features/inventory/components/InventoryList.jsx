// InventoryList.jsx
// Displays inventory products as cards (mobile) or table (desktop)

import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Card, CardContent } from '../../../shared/components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { cn } from '../../../shared/utils/cn';
import { formatCurrency } from '../../../shared/utils/formatters';
import { getStockStatus } from '../hooks/useInventory';
import { Edit, Minus, Plus, Trash2 } from 'lucide-react';

function StockBadge({ quantity }) {
  const status = getStockStatus(quantity);
  return (
    <Badge
      className={cn(
        'font-mono',
        status === 'critical' && 'bg-red-100 text-red-700 border border-red-300',
        status === 'medium' && 'bg-orange-100 text-orange-700 border border-orange-300',
        status === 'good' && 'bg-green-100 text-green-700 border border-green-300'
      )}
    >
      {quantity} uds
    </Badge>
  );
}

function InventoryList({ products, onEdit, onDelete, onQuantityChange, isMobile }) {
  const handleDelete = (product) => {
    if (window.confirm(`¿Eliminar "${product.name}"?`)) {
      onDelete(product.id);
    }
  };

  if (isMobile) {
    return (
      <div className="grid gap-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    {product.category}
                    {product.size && ` • ${product.size}`}
                    {product.color && ` • ${product.color}`}
                  </p>
                  <p className="text-lg font-bold text-blue-600 mt-1">
                    {formatCurrency(product.price || product.sale_price)}
                  </p>
                </div>
                <StockBadge quantity={product.inventory?.quantity ?? 0} />
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => onQuantityChange(product.id, product.inventory?.quantity ?? 0, -1)}
                    disabled={(product.inventory?.quantity ?? 0) === 0}
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-mono text-lg text-gray-900">
                    {product.inventory?.quantity ?? 0}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => onQuantityChange(product.id, product.inventory?.quantity ?? 0, 1)}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Edit / Delete */}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(product)}
                    aria-label="Editar producto"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(product)}
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Desktop table
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Talla</TableHead>
            <TableHead>Color</TableHead>
            <TableHead className="text-right">Precio</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
              <TableCell className="text-gray-600">{product.category}</TableCell>
              <TableCell className="text-gray-600">{product.size || '–'}</TableCell>
              <TableCell className="text-gray-600">{product.color || '–'}</TableCell>
              <TableCell className="text-right font-mono font-semibold text-gray-900">
                {formatCurrency(product.price || product.sale_price)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onQuantityChange(product.id, product.inventory?.quantity ?? 0, -1)}
                    disabled={(product.inventory?.quantity ?? 0) === 0}
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <StockBadge quantity={product.inventory?.quantity ?? 0} />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onQuantityChange(product.id, product.inventory?.quantity ?? 0, 1)}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(product)}
                    aria-label="Editar producto"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(product)}
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default InventoryList;
