// Input.jsx
// Shared reusable Input component
import React from 'react';

// utilidad para clases dinámicas
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Input = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '',
  error = '',
  required = false,
  className
}) => {

  return (
    <div className="w-full space-y-1">
        {/* Label */}
        {label && (
          <label
            htmlFor={name}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}

        {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
          className={cn(
            'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500',
            className
          )}        
      />
      {/* Error */}
      {error && <span className="text-sm text-red-500">
        {error}
      </span>}
    </div>
  );
};
Input.displayName = 'Input';
export default Input;
