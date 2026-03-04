// CustomerList.jsx
// Component for displaying list of customers

import { useState } from 'react';
import MainLayout from '../../../shared/layouts/MainLayout';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../../../shared/components/Dialog';
import { Skeleton } from '../../../shared/components/Skeleton';
import { useCustomers } from '../hooks/useCustomers';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import { toast } from '../../../shared/hooks/useToast';
import CustomerForm from './CustomerForm';
import { Plus, Search, Users, Pencil, Trash2, Mail, Phone } from 'lucide-react';

export default function CustomerList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    const { customers, isLoading, error, addCustomer, updateCustomer, deleteCustomer, refetch } = useCustomers();
    const isMobile = useIsMobile();

    const handleAddSubmit = async (data) => {
        try {
            await addCustomer(data);
            setIsAddDialogOpen(false);
            toast.success('Cliente creado', 'El cliente se agregó correctamente');
        } catch (err) {
            console.error('Error creating customer:', err);
            toast.error('Error', err.message || 'Error al crear cliente');
        }
    };

    const handleEditSubmit = async (data) => {
        try {
            await updateCustomer(editingCustomer.id, data);
            setEditingCustomer(null);
            toast.success('Cliente actualizado', 'Los cambios se guardaron correctamente');
        } catch (err) {
            console.error('Error updating customer:', err);
            toast.error('Error', err.message || 'Error al actualizar cliente');
        }
    };

    const handleDelete = async (customer) => {
        if (!confirm(`¿Estás seguro de eliminar el cliente "${customer.name}"?`)) {
            return;
        }
        try {
            await deleteCustomer(customer.id);
            toast.success('Cliente eliminado', 'El cliente se eliminó correctamente');
        } catch (err) {
            console.error('Error deleting customer:', err);
            toast.error('Error', err.message || 'Error al eliminar cliente');
        }
    };

    const filteredCustomers = customers.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.phone && c.phone.includes(searchQuery))
    );

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

    if (error) {
        return (
            <MainLayout>
                <div className="space-y-6 pb-20 md:pb-0">
                    <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={refetch}>Reintentar</Button>
                        </CardContent>
                    </Card>
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
                        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
                        <p className="text-gray-500 text-sm">
                            {customers.length} {customers.length === 1 ? 'cliente' : 'clientes'}
                        </p>
                    </div>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="h-12">
                                <Plus className="w-5 h-5 mr-2" />
                                Agregar cliente
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <h2 className="text-lg font-semibold">Nuevo cliente</h2>
                            </DialogHeader>
                            <CustomerForm
                                onSubmit={handleAddSubmit}
                                onCancel={() => setIsAddDialogOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Buscar por nombre, email o teléfono..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12"
                        />
                    </div>
                </div>

                {/* Customer list */}
                {filteredCustomers.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 pt-5 text-center">
                            <Users className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900">No hay clientes</h3>
                            <p className="text-gray-500 mb-4">
                                {searchQuery
                                    ? 'No se encontraron clientes con esa búsqueda'
                                    : 'Comienza agregando tu primer cliente'}
                            </p>
                            {!searchQuery && (
                                <Button onClick={() => setIsAddDialogOpen(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Agregar cliente
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : isMobile ? (
                    <div className="space-y-3">
                        {filteredCustomers.map((customer) => (
                            <Card key={customer.id}>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                                            {customer.email && (
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {customer.email}
                                                </p>
                                            )}
                                            {customer.phone && (
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Phone className="w-3 h-3" />
                                                    {customer.phone}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setEditingCustomer(customer)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(customer)}
                                                className="text-red-600 hover:text-red-700"
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
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Nombre</th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Email</th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Teléfono</th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Registrado</th>
                                        <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <span className="font-medium text-gray-900">{customer.name}</span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {customer.email || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {customer.phone || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('es-PE') : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setEditingCustomer(customer)}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(customer)}
                                                        className="text-red-600 hover:text-red-700"
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
                    </Card>
                )}

                {/* Edit Dialog */}
                {editingCustomer && (
                    <Dialog open={!!editingCustomer} onOpenChange={() => setEditingCustomer(null)}>
                        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <h2 className="text-lg font-semibold">Editar cliente</h2>
                            </DialogHeader>
                            <CustomerForm
                                initialData={editingCustomer}
                                onSubmit={handleEditSubmit}
                                onCancel={() => setEditingCustomer(null)}
                            />
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </MainLayout>
    );
}
