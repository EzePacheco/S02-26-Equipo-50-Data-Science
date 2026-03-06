// Inventory.jsx
// Main inventory page

import { useState, useEffect } from 'react';

import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../shared/components/Dialog';
import { Skeleton } from '../../../shared/components/Skeleton';
import { useInventory, CATEGORIES as DEFAULT_CATEGORIES, getStockStatus } from '../hooks/useInventory';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import { toast } from '../../../shared/hooks/useToast';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';
import { useAuth } from '../../auth/hooks/useAuth';
import { Plus, Search, Package, AlertTriangle } from 'lucide-react';

function getStoreCategories(user) {
    if (user?.store?.categories?.length > 0) return user.store.categories;
    try {
        const saved = localStorage.getItem('store_categories');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) { /* ignore */ }
    return DEFAULT_CATEGORIES;
}

export default function Inventory() {
    const { user } = useAuth();
    const storeCategories = getStoreCategories(user);

    const [categoryFilter, setCategoryFilter] = useState('Todas las categorías');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); // full product object or null
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { products, allProducts, isLoading, addProduct, updateProduct, deleteProduct, updateQuantity, refresh } =
        useInventory(categoryFilter);

    useEffect(() => {
        const handleGlobalSale = () => refresh();
        window.addEventListener('sale-created', handleGlobalSale);
        return () => window.removeEventListener('sale-created', handleGlobalSale);
    }, [refresh]);

    const isMobile = useIsMobile();

    // Client-side search filter
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Count products with critical stock across all (unfiltered) products
    const lowStockCount = allProducts.filter((p) => getStockStatus(p.quantity) === 'critical').length;

    const handleQuickQuantityChange = (id, currentQty, delta) => {
        const newQty = Math.max(0, currentQty + delta);
        updateQuantity(id, newQty);
    };

    const handleAddSubmit = (data) => {
        addProduct(data);
        setIsAddDialogOpen(false);
        toast.success('Producto creado', 'El producto se agregó correctamente');
    };

    const handleEditSubmit = (data) => {
        updateProduct(editingProduct.id, data);
        setEditingProduct(null);
        toast.success('Producto actualizado', 'Los cambios se guardaron correctamente');
    };

    if (isLoading) {
        return (
            <>
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
            </>
        );
    }

    return (
        <>
            <div className="space-y-6 pb-20 md:pb-0">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
                        <p className="text-gray-500 text-sm">
                            {allProducts.length} {allProducts.length === 1 ? 'producto' : 'productos'}
                            {lowStockCount > 0 && (
                                <span className="text-red-600 font-medium ml-1">
                                    • {lowStockCount} por agotarse
                                </span>
                            )}
                        </p>
                    </div>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="h-12">
                                <Plus className="w-5 h-5 mr-2" />
                                Nuevo producto
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
                            <SelectItem value="Todas las categorías">Todas las categorías</SelectItem>
                            {storeCategories.map((cat) => (
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
                        <CardContent className="flex items-center gap-3 p-4">
                            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                            <p className="text-sm text-gray-900">
                                <span className="font-semibold">{lowStockCount} {lowStockCount === 1 ? 'producto' : 'productos'}</span>{' '}
                                {lowStockCount === 1 ? 'se está terminando' : 'se están terminando'} (menos de 3 unidades)
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Product list */}
                {filteredProducts.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center pt-12">
                            <Package className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900">No hay productos</h3>
                            <p className="text-gray-500 mb-4">
                                {searchQuery || categoryFilter !== 'Todas las categorías'
                                    ? 'No se encontraron productos con esos filtros'
                                    : 'Comienza agregando tu primer producto'}
                            </p>
                            {!searchQuery && categoryFilter === 'Todas las categorías' && (
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
                        onDelete={(product) => setProductToDelete(product)}
                        onQuantityChange={handleQuickQuantityChange}
                    />
                )}

                {/* Confirm Delete Dialog */}
                <ConfirmDialog
                    open={!!productToDelete}
                    onOpenChange={(open) => !open && setProductToDelete(null)}
                    onConfirm={async () => {
                        if (!productToDelete) return;
                        try {
                            setIsDeleting(true);
                            await deleteProduct(productToDelete.id);
                            toast.success('Producto eliminado', 'El producto se eliminó correctamente');
                            setProductToDelete(null);
                        } catch (error) {
                            toast.error('Error', 'No se pudo eliminar el producto');
                        } finally {
                            setIsDeleting(false);
                        }
                    }}
                    title="¿Eliminar producto?"
                    description={`¿Estás seguro de que deseas eliminar "${productToDelete?.name}"? Esta acción no se puede deshacer.`}
                    isLoading={isDeleting}
                />

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
        </>
    );
}
