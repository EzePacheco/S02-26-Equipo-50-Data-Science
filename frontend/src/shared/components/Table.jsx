// Table.jsx
// Shared reusable Table component

const Table = ({ 
  columns, 
  data, 
  onRowClick = null,
  actions = null 
}) => {
  // TODO: Implementar componente Table
  // - Columnas dinámicas
  // - Soporte de ordenamiento
  // - Soporte de paginación
  // - Acciones de fila
  // - Estado vacío

  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
          {actions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {/* TODO: Renderizar filas */}
      </tbody>
    </table>
  );
};

export default Table;
