import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Context para manejar el estado de las tabs
const TabsContext = React.createContext({});

export const Tabs = ({ defaultValue, value, onValueChange, className, children, ...props }) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || value);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ value: value || selectedValue, onValueChange: handleValueChange }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, className, children, ...props }) => {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
        'ring-offset-white transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        isSelected
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900',
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, className, children, ...props }) => {
  const { value: selectedValue } = React.useContext(TabsContext);

  if (selectedValue !== value) {
    return null;
  }

  return (
    <div
      className={cn('mt-4 ring-offset-white focus-visible:outline-none focus-visible:ring-2', className)}
      {...props}
    >
      {children}
    </div>
  );
};