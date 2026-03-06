import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './Dialog';
import { Button } from './Button';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

const ConfirmDialog = ({
    open,
    onOpenChange,
    onConfirm,
    title = "¿Estás seguro?",
    description = "Esta acción no se puede deshacer.",
    confirmText = "Eliminar",
    cancelText = "Cancelar",
    variant = "danger",
    isLoading = false
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[200px] p-0 overflow-hidden border-none shadow-2xl">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={cn(
                            "p-3 rounded-full shrink-0",
                            variant === "danger"
                                ? "bg-red-50 text-red-600"
                                : "bg-amber-50 text-amber-600"
                        )}>
                            {variant === "danger" ? (
                                <Trash2 className="w-6 h-6" />
                            ) : (
                                <AlertTriangle className="w-6 h-6" />
                            )}
                        </div>

                        <div className="space-y-2">
                            <DialogHeader className="p-0 border-none">
                                <DialogTitle className="text-xl font-bold text-gray-900 leading-tight">
                                    {title}
                                </DialogTitle>
                            </DialogHeader>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                        className="border-gray-200 text-gray-700 hover:bg-gray-100 h-11"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === "danger" ? "destructive" : "default"}
                        onClick={onConfirm}
                        isLoading={isLoading}
                        className={cn(
                            "h-11 px-6 font-medium shadow-sm transition-all active:scale-95",
                            variant === "danger"
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-amber-600 hover:bg-amber-700 text-white"
                        )}
                    >
                        {confirmText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;
