// Inventory.jsx
// Main inventory page

import { useState } from 'react';
import MainLayout from '../../../shared/layouts/MainLayout';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../shared/components/Dialog';
import { Skeleton } from '../../../shared/components/Skeleton';
import { useInventory, CATEGORIES, getStockStatus } from '../hooks/useInventory';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';
import { Plus, Search, Package, AlertTriangle } from 'lucide-react';

export default function Inventory() {
    const [categoryFilter, setCategoryFilter] = useState('todos');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); // full product object or null

    const { products, allProducts, isLoading, addProduct, updateProduct, deleteProduct, updateQuantity } =
        useInventory(categoryFilter);

    const isMobile = useIsMobile();

    // Client-side search filter
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Count products with critical stock across all (unfiltered) products
    const lowStockCount = allProducts.filter((p) => getStockStatus(p.quantity) === 'critical').length;

    const handleQuickQuantityChange = (id, currentQty, delta) => {
        const newQty = Math.max(0, currentQty + delta);
        updateQuantity({ id, quantity: newQty });
    };

    const handleAddSubmit = (data) => {
        addProduct(data);
        setIsAddDialogOpen(false);
    };

    const handleEditSubmit = (data) => {
        updateProduct({ id: editingProduct.id, ...data });
        setEditingProduct(null);
    };

    if (isLoading) {
        return (
            <MainLayout>
                <div className="space-y-6 pb-20 md:pb-0">
                    <Skeleton className="h-8 w-48" />
                    <div className="grid gap-3">
                        {[...Array(5)].map((_, i) => (
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
            <div className="space-y-6 pb-20 md:pb-0">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
                        <p className="text-gray-500 text-sm">
                            {allProducts.length} {allProducts.length === 1 ? 'producto' : 'productos'}
                            {lowStockCount > 0 && (
                                <span className="text-red-600 font-medium ml-1">
                                    • {lowStockCount} con stock crítico
                                </span>
                            )}
                        </p>
                    </div>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="h-12">
                                <Plus className="w-5 h-5 mr-2" />
                                Agregar producto
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Nuevo producto</DialogTitle>
                            </DialogHeader>
                            <InventoryForm
                                onSubmit={handleAddSubmit}
                                onCancel={() => setIsAddDialogOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Buscar producto..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12"
                        />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full sm:w-48 h-12">
                            <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todas las categorías</SelectItem>
                            {CATEGORIES.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Low stock alert */}
                {lowStockCount > 0 && (
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="flex items-center gap-3 py-4">
                            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                            <p className="text-sm text-gray-900">
                                <span className="font-semibold">{lowStockCount} {lowStockCount === 1 ? 'producto' : 'productos'}</span>{' '}
                                {lowStockCount === 1 ? 'tiene' : 'tienen'} stock crítico (menos de 3 unidades)
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Product list */}
                {filteredProducts.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <Package className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900">No hay productos</h3>
                            <p className="text-gray-500 mb-4">
                                {searchQuery || categoryFilter !== 'todos'
                                    ? 'No se encontraron productos con esos filtros'
                                    : 'Comienza agregando tu primer producto'}
                            </p>
                            {!searchQuery && categoryFilter === 'todos' && (
                                <Button onClick={() => setIsAddDialogOpen(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Agregar producto
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <InventoryList
                        products={filteredProducts}
                        isMobile={isMobile}
                        onEdit={setEditingProduct}
                        onDelete={deleteProduct}
                        onQuantityChange={handleQuickQuantityChange}
                    />
                )}

                {/* Edit Dialog */}
                {editingProduct && (
                    <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
                        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Editar producto</DialogTitle>
                            </DialogHeader>
                            <InventoryForm
                                initialData={editingProduct}
                                onSubmit={handleEditSubmit}
                                onCancel={() => setEditingProduct(null)}
                            />
                        </DialogContent>
                    </Dialog>
                )}

            </div>
        </MainLayout>
    );
}
