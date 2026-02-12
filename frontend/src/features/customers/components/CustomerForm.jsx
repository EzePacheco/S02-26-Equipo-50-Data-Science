// CustomerForm.jsx
// Component for creating/editing a customer

const CustomerForm = ({ customer, onSave }) => {
  // TODO: Implementar componente de formulario de cliente
  // - Campos de nombre, email, teléfono
  // - Validación

  return (
    <form>
      <h2>{customer ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
      {/* TODO: Implementar formulario de cliente */}
    </form>
  );
};

export default CustomerForm;
