// Button.jsx
// Shared reusable Button component

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  className = '' 
}) => {
  // TODO: Implementar componente Button
  // - Soporte de diferentes variantes: primary, secondary, danger
  // - Manejar estado deshabilitado
  // - Aplicar clases de Tailwind

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
