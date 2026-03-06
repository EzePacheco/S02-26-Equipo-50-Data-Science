import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/components/Dialog';
import { Plus } from 'lucide-react';
import { useSales } from '../hooks/useSales';
import { toast } from '../../../shared/hooks/useToast';
import SaleForm from './SaleForm';

export default function GlobalSaleButton() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { addSale } = useSales();

    const handleSaleCreated = () => {
        setIsAddDialogOpen(false);
        toast.success('¡Anotado!', 'La venta se registró correctamente');
        // Dispatch event to notify other components to refresh their data
        window.dispatchEvent(new CustomEvent('sale-created'));
    };

    return (
        <>
            {/* Floating Action Button */}
            <Button
                className="fixed bottom-20 right-4 md:bottom-8 md:right-8 h-14 w-14 rounded-full shadow-lg hover:scale-105 transition z-40 py-0 px-0 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setIsAddDialogOpen(true)}
                aria-label="Anotar una venta"
            >
                <Plus className="w-6 h-6" />
            </Button>

            {/* Add Sale Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-0">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle>Anotar una venta</DialogTitle>
                    </DialogHeader>
                    <div className="p-6 pt-4">
                        <SaleForm
                            onSubmit={(data) => {
                                return addSale.mutateAsync({
                                    customerId: data.customerId,
                                    customerName: data.customerName,
                                    paymentMethod: data.paymentMethod,
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
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
