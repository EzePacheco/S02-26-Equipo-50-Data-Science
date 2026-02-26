import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export const Separator = ({ className, orientation = 'horizontal', ...props }) => {
    return (
        <div
            className={cn(
                'shrink-0 bg-gray-200',
                orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
                className
            )}
            {...props}
        />
    );
};

export default Separator;
