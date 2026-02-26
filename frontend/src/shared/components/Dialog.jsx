// src/shared/components/Dialog.jsx
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

const DialogContext = React.createContext({});

export const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onOpenChange(false)} />
      )}
    </DialogContext.Provider>
  );
};

export const DialogTrigger = ({ children, asChild }) => {
  const { onOpenChange } = React.useContext(DialogContext);
  
  if (asChild) {
    return React.cloneElement(children, {
      onClick: () => onOpenChange(true)
    });
  }
  
  return (
    <div onClick={() => onOpenChange(true)}>
      {children}
    </div>
  );
};

export const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(DialogContext);
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        ref={ref}
        className={cn(
          'relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6',
          'animate-in fade-in-0 zoom-in-95',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
});

DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left mb-4', className)} {...props} />
);

export const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-lg font-semibold', className)} {...props} />
));

DialogTitle.displayName = 'DialogTitle';