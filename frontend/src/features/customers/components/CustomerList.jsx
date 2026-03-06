// CustomerList.jsx
// Component for displaying list of customers

import { useState } from 'react';

import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../../../shared/components/Dialog';
import { Skeleton } from '../../../shared/components/Skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { useCustomers } from '../hooks/useCustomers';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import { toast } from '../../../shared/hooks/useToast';
import CustomerForm from './CustomerForm';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';
import { Plus, Search, Users, Pencil, Trash2, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionCard = motion(Card);

export default function CustomerList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer);
    };

    const handleConfirmDelete = async () => {
        if (!customerToDelete) return;
        try {
            setIsDeleting(true);
            await deleteCustomer(customerToDelete.id);
            toast.success('Cliente eliminado', 'El cliente se eliminó correctamente');
            setCustomerToDelete(null);
        } catch (err) {
            console.error('Error deleting customer:', err);
            toast.error('Error', err.message || 'Error al eliminar cliente');
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredCustomers = customers.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.phone && c.phone.includes(searchQuery))
    );

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
                    <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={refetch}>Reintentar</Button>
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
                    /* Mobile cards */
                    <div className="space-y-3">
                        <AnimatePresence>
                            {filteredCustomers.map((customer) => (
                                <MotionCard
                                    key={customer.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <CardContent className="p-4 pt-5">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 min-w-0 text-left">
                                                <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                                                {customer.email && (
                                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                        <Mail className="w-3 h-3" />
                                                        {customer.email}
                                                    </p>
                                                )}
                                                {customer.phone && (
                                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                                        <Phone className="w-3 h-3" />
                                                        {customer.phone}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex gap-1 pt-4">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setEditingCustomer(customer)}
                                                    aria-label="Editar cliente"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => handleDeleteClick(customer)}
                                                    aria-label="Eliminar cliente"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </MotionCard>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    /* Desktop table — mismo estilo que InventoryList */
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Teléfono</TableHead>
                                    <TableHead>Registrado</TableHead>
                                    <TableHead className="text-left pl-6">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence>
                                    {filteredCustomers.map((customer) => (
                                        <motion.tr
                                            key={customer.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="border-b border-gray-200 transition-colors hover:bg-gray-50"
                                        >
                                            <TableCell className="font-semibold text-gray-900">{customer.name}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{customer.email || '–'}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{customer.phone || '–'}</TableCell>
                                            <TableCell className="text-sm text-gray-500">
                                                {customer.createdAt
                                                    ? new Date(customer.createdAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
                                                    : '–'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-start gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => setEditingCustomer(customer)}
                                                        aria-label="Editar cliente"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => handleDeleteClick(customer)}
                                                        aria-label="Eliminar cliente"
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

                {/* Confirm Delete Dialog */}
                <ConfirmDialog
                    open={!!customerToDelete}
                    onOpenChange={(open) => !open && setCustomerToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    title="¿Eliminar cliente?"
                    description={`¿Estás seguro de que deseas eliminar a "${customerToDelete?.name}"? Esta acción eliminará permanentemente todos sus datos.`}
                    isLoading={isDeleting}
                />
            </div>
        </>
    );
}