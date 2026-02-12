// Input.jsx
// Shared reusable Input component

const Input = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '',
  error = '',
  required = false 
}) => {
  // TODO: Implementar componente Input
  // - Soporte de etiqueta
  // - Mostrar mensaje de error
  // - Diferentes tipos de input
  // - Estilos con Tailwind

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <span>{error}</span>}
    </div>
  );
};

export default Input;
