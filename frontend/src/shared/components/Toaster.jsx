// Toaster.jsx
// Toast notification renderer component

import { useToast } from '../hooks/useToast';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const VARIANT_STYLES = {
    default: {
        bg: 'bg-white',
        border: 'border-gray-200',
        icon: Info,
        iconColor: 'text-blue-500',
    },
    success: {
        bg: 'bg-white',
        border: 'border-green-200',
        icon: CheckCircle,
        iconColor: 'text-green-500',
    },
    error: {
        bg: 'bg-white',
        border: 'border-red-200',
        icon: AlertCircle,
        iconColor: 'text-red-500',
    },
    warning: {
        bg: 'bg-white',
        border: 'border-yellow-200',
        icon: AlertTriangle,
        iconColor: 'text-yellow-500',
    },
};

export function Toaster() {
    const { toasts, dismiss } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
            {toasts.map((t) => {
                const style = VARIANT_STYLES[t.variant] || VARIANT_STYLES.default;
                const IconComponent = style.icon;

                return (
                    <div
                        key={t.id}
                        className={`
              pointer-events-auto
              flex items-start gap-3 p-4 rounded-xl shadow-lg border
              ${style.bg} ${style.border}
              transition-all duration-300 ease-out
              ${t.open
                                ? 'toast-slide-in opacity-100 translate-y-0'
                                : 'toast-slide-out opacity-0 translate-y-2'
                            }
            `}
                        role="alert"
                    >
                        <IconComponent className={`w-5 h-5 mt-0.5 shrink-0 ${style.iconColor}`} />
                        <div className="flex-1 min-w-0">
                            {t.title && (
                                <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                            )}
                            {t.description && (
                                <p className="text-sm text-gray-500 mt-0.5">{t.description}</p>
                            )}
                        </div>
                        <button
                            onClick={() => dismiss(t.id)}
                            className="shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default Toaster;
