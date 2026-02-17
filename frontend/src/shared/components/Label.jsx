import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export const Label = React.forwardRef(({ 
  className,
  htmlFor,
  children,
  ...props 
}, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(
        'text-sm font-medium leading-none text-gray-900',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Label';

export default Label;