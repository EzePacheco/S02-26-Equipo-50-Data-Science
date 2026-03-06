// InventoryList.jsx
// Displays inventory products as cards (mobile) or table (desktop)

import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Card, CardContent } from '../../../shared/components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { cn } from '../../../shared/utils/cn';
import { formatCurrency } from '../../../shared/utils/formatters';
import { getStockStatus } from '../hooks/useInventory';
import { Pencil, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionCard = motion(Card);

function StockBadge({ quantity }) {
  const status = getStockStatus(quantity);
  const variantMap = {
    critical: 'destructive',
    medium: 'warning',
    good: 'success'
  };

  return (
    <Badge variant={variantMap[status]} className="font-mono">
      {quantity} uds
    </Badge>
  );
}

function InventoryList({ products, onEdit, onDelete, onQuantityChange, isMobile }) {
  const handleDelete = (product) => {
    onDelete(product);
  };

  if (isMobile) {
    return (
      <div className="grid gap-3">
        <AnimatePresence>
          {products.map((product) => (
            <MotionCard
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 pt-5">
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      {formatCurrency(product.price || product.sale_price)}
                    </p>
                    {(product.size || product.color) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {product.size && `${product.size}`}
                        {product.size && product.color && ' • '}
                        {product.color && `${product.color}`}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <StockBadge quantity={product.inventory?.quantity ?? 0} />

                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(product)}
                        aria-label="Editar producto"
                      >
                        <Pencil className="w-4 h-4" />
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
                </div>
              </CardContent>
            </MotionCard>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop table
  return (
    <Card>
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead >Producto</TableHead>
            <TableHead >Categoría</TableHead>
            <TableHead >Talla</TableHead>
            <TableHead >Color</TableHead>
            <TableHead className="text-left">Precio</TableHead>
            <TableHead className="text-between">Cantidad</TableHead>
            <TableHead className="text-left pl-6">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {products.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-b border-gray-200 transition-colors hover:bg-gray-50"
              >
                <TableCell className="font-medium text-gray-900 truncate">{product.name}</TableCell>
                <TableCell className="text-gray-600 truncate">{product.category}</TableCell>
                <TableCell className="text-gray-600 pl-5">{product.size || '–'}</TableCell>
                <TableCell className="text-gray-600">{product.color || '–'}</TableCell>
                <TableCell className="text-left font-mono font-semibold text-gray-900 pl-1">
                  {formatCurrency(product.price || product.sale_price)}
                </TableCell>
                <TableCell className="text-left font-mono font-semibold text-gray-900 pl-5">
                  <StockBadge quantity={product.inventory?.quantity ?? 0} />
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex justify-start gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEdit(product)}
                      aria-label="Editar producto"
                    >
                      <Pencil className="w-4 h-4" />
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
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </Card>
  );
}

export default InventoryList;
