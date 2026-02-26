import React from 'react';
import { cn } from '../utils/cn';

const badgeVariants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100',
  success: 'bg-green-100 text-green-700 border border-green-200',
  warning: 'bg-orange-100 text-orange-700 border border-orange-200',
};

export const Badge = React.forwardRef(({ 
  className, 
  variant = 'default',
  children,
  ...props 
}, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;