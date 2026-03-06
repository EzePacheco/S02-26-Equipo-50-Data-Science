// src/shared/components/Dialog.jsx
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

import { motion, AnimatePresence } from 'framer-motion';

const DialogContext = React.createContext({});

export const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>
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

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              'relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 pointer-events-auto',
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 flex items-center justify-center w-10 h-10 rounded-full bg-black-50 hover:bg-red-100 transition-all duration-200 shadow-sm"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 text-left mb-4', className)} {...props} />
);

export const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-lg font-semibold', className)} {...props} />
));

DialogTitle.displayName = 'DialogTitle';