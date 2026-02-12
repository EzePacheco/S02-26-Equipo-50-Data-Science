// SaleForm.jsx
// Component for creating/editing a sale

const SaleForm = ({ sale, onSave }) => {
  // TODO: Implementar componente de formulario de venta
  // - Agregar productos a la venta
  // - Seleccionar cliente
  // - Calcular totales
  // - Enviar venta

  return (
    <form>
      <h2>{sale ? 'Editar Venta' : 'Nueva Venta'}</h2>
      {/* TODO: Implementar formulario de venta */}
    </form>
  );
};

export default SaleForm;
