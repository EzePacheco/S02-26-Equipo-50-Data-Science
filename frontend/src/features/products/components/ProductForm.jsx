// ProductForm.jsx
// Component for creating/editing a product

const ProductForm = ({ product, onSave }) => {
  // TODO: Implementar componente de formulario de producto
  // - Campos de nombre, SKU, precio
  // - Selector de categoría (ROPA/CALZADO)
  // - Toggle activo/inactivo
  // - Validación

  return (
    <form>
      <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      {/* TODO: Implementar formulario de producto */}
    </form>
  );
};

export default ProductForm;
