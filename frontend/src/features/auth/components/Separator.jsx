import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export const Separator = React.forwardRef(({ 
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={orientation}
      className={cn(
        'shrink-0 bg-gray-200',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  );
});

Separator.displayName = 'Separator';

export default Separator;