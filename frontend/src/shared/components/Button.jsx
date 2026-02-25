// Button.jsx
// Shared reusable Button component
import React from 'react';
import { Link } from 'react-router-dom';

// Utilidad simple para combinar clases
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Variantes de estilos para el botón
const getButtonClasses = ({ variant = 'default', size = 'default', className = '' }) => {
  const baseClasses = 
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ' +
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'disabled:pointer-events-none disabled:opacity-50';

  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'hover:bg-gray-100 hover:text-gray-900',
    link: 'text-blue-600 underline-offset-4 hover:underline',
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3 text-xs',
    lg: 'h-11 rounded-md px-8 text-base',
    icon: 'h-10 w-10',
  };

  return cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
};

export const Button = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  to,
  children,
  ...props 
}, ref) => {
  const classes = getButtonClasses({ variant, size, className });

  // Si se pasa la prop 'to', renderizar como Link de react-router-dom
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  // Por defecto, renderizar un botón normal
  return (
    <button className={classes} ref={ref} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;