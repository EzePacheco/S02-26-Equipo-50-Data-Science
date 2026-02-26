// src/shared/components/Select.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

const SelectContext = React.createContext({});

export const Select = ({ value, onValueChange, children, required }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, required }}>
      {children}
    </SelectContext.Provider>
  );
};

export const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, setOpen } = React.useContext(SelectContext);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2',
        'text-sm placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = ({ placeholder, children }) => {
  const { value } = React.useContext(SelectContext);

  return (
    <span className={cn(!value && 'text-gray-400')}>
      {value ? (children || value) : placeholder}
    </span>
  );
};

export const SelectContent = ({ children }) => {
  const { open, setOpen } = React.useContext(SelectContext);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto">
        {children}
      </div>
    </>
  );
};

export const SelectItem = ({ value: itemValue, children }) => {
  const { value, onValueChange, setOpen } = React.useContext(SelectContext);

  const handleClick = () => {
    onValueChange(itemValue);
    setOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm',
        'hover:bg-gray-100',
        value === itemValue && 'bg-blue-50 text-blue-600'
      )}
    >
      {children}
    </div>
  );
};