// Modal.jsx
// Shared reusable Modal component

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  footer = null 
}) => {
  // TODO: Implementar componente Modal
  // - Overlay de fondo
  // - Cerrar al hacer clic en el fondo
  // - Cerrar con tecla Escape
  // - Prevenir scroll del body cuando está abierto

  if (!isOpen) return null;

  return (
    <div>
      <div>
        {title && <h3>{title}</h3>}
        <button onClick={onClose}>×</button>
      </div>
      <div>{children}</div>
      {footer && <div>{footer}</div>}
    </div>
  );
};

export default Modal;
