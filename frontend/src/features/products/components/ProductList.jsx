// ProductList.jsx
// Component for displaying list of products

import { useState, useEffect } from 'react';

import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/Select';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../../../shared/components/Dialog';
import { Skeleton } from '../../../shared/components/Skeleton';
import { productsApi } from '../api/productsApi';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import { toast } from '../../../shared/hooks/useToast';
import ProductForm from './ProductForm';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';
import { useAuth } from '../../auth/hooks/useAuth';
import { Plus, Search, Package, Pencil, Trash2 } from 'lucide-react';

const DEFAULT_CATEGORIES = ['ROPA', 'CALZADO'];

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

export default function ProductList() {
    const { user } = useAuth();
    const storeCategories = getStoreCategories(user);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('Todas las categorías');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const isMobile = useIsMobile();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await productsApi.getAll();
            setProducts(data);
        } catch (err) {
            console.error('Error loading products:', err);
            setError(err.message || 'Error al cargar productos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddSubmit = async (data) => {
        try {
            await productsApi.create(data);
            await loadProducts();
            setIsAddDialogOpen(false);
            toast.success('Producto creado', 'El producto se agregó correctamente');
        } catch (err) {
            console.error('Error creating product:', err);
            toast.error('Error', err.message || 'Error al crear producto');
        }
    };

    const handleEditSubmit = async (data) => {
        try {
            await productsApi.update(editingProduct.id, data);
            await loadProducts();
            setEditingProduct(null);
            toast.success('Producto actualizado', 'Los cambios se guardaron correctamente');
        } catch (err) {
            console.error('Error updating product:', err);
            toast.error('Error', err.message || 'Error al actualizar producto');
        }
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;

        try {
            setIsDeleting(true);
            await productsApi.delete(productToDelete.id);
            await loadProducts();
            toast.success('Producto eliminado', 'El producto se eliminó correctamente');
            setProductToDelete(null);
        } catch (err) {
            console.error('Error deleting product:', err);
            toast.error('Error', err.message || 'Error al eliminar producto');
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = categoryFilter === 'Todas las categorías' || p.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

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

    if (error) {
        return (
            <>
                <div className="space-y-6 pb-20 md:pb-0">
                    <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={loadProducts}>Reintentar</Button>
                        </CardContent>
                    </Card>
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
                            {products.length} {products.length === 1 ? 'producto' : 'productos'}
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
                                <h2 className="text-lg font-semibold">Nuevo producto</h2>
                            </DialogHeader>
                            <ProductForm
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
                            placeholder="Buscar por nombre o SKU..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12"
                        />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full sm:w-56 h-12">
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

                {/* Product list */}
                {filteredProducts.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
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
                ) : isMobile ? (
                    <div className="space-y-3">
                        {filteredProducts.map((product) => (
                            <Card key={product.id}>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                                            <p className="text-lg font-bold text-blue-600">S/ {parseFloat(product.price).toFixed(2)}</p>
                                            <span className={`inline-block text-xs px-2 py-1 rounded-full ${product.category === 'ROPA'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-green-100 text-green-700'
                                                }`}>
                                                {product.category}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setEditingProduct(product)}
                                                className="h-9 w-9 p-0 rounded-xl hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDeleteClick(product)}
                                                className="h-9 w-9 p-0 rounded-xl hover:bg-red-50 hover:border-red-100 hover:text-red-600 text-red-400 transition-all shadow-sm"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-gray-400 w-[30%]">Producto</th>
                                        <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-gray-400 w-[20%]">SKU</th>
                                        <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-gray-400 w-[15%]">Categoría</th>
                                        <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-gray-400 w-[15%]">Precio</th>
                                        <th className="text-left p-5 text-xs font-bold uppercase tracking-wider text-gray-400 w-[10%]">Estado</th>
                                        <th className="text-right p-5 text-xs font-bold uppercase tracking-wider text-gray-400 w-[10%] pr-8">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="group hover:bg-blue-50/30 transition-all duration-200">
                                            <td className="p-5 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                                                        {product.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-semibold text-gray-900">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-5 align-middle text-gray-500 font-medium">{product.sku}</td>
                                            <td className="p-5 align-middle">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold tracking-wide ${product.category === 'ROPA'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-emerald-100 text-emerald-700'
                                                    }`}>
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="p-5 align-middle">
                                                <span className="font-bold text-gray-900">
                                                    S/ {parseFloat(product.price).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-5 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-2 w-2 rounded-full ${product.active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                                                    <span className={`text-xs font-bold ${product.active ? 'text-green-600' : 'text-gray-500'}`}>
                                                        {product.active ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-5 align-middle text-right pr-8">
                                                <div className="flex items-center justify-end gap-2 transform group-hover:scale-105 transition-transform">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setEditingProduct(product)}
                                                        className="h-9 w-9 p-0 rounded-xl hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(product)}
                                                        className="h-9 w-9 p-0 rounded-xl hover:bg-red-50 hover:border-red-100 hover:text-red-600 text-red-400 transition-all shadow-sm"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Edit Dialog */}
                {editingProduct && (
                    <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
                        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <h2 className="text-lg font-semibold">Editar producto</h2>
                            </DialogHeader>
                            <ProductForm
                                initialData={editingProduct}
                                onSubmit={handleEditSubmit}
                                onCancel={() => setEditingProduct(null)}
                            />
                        </DialogContent>
                    </Dialog>
                )}

                {/* Confirm Delete Dialog */}
                <ConfirmDialog
                    open={!!productToDelete}
                    onOpenChange={(open) => !open && setProductToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    title="¿Eliminar producto?"
                    description={`¿Estás seguro de que deseas eliminar "${productToDelete?.name}"? Esta acción eliminará permanentemente el producto y su historial.`}
                    isLoading={isDeleting}
                />
            </div>
        </>
    );
}
