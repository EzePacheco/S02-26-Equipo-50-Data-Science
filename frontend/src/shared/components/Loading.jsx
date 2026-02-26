// Loading.jsx
// Shared loading spinner component

const Loading = ({ size = 'medium', message = 'Cargando...' }) => {
  // TODO: Implementar componente Loading
  // - Diferentes tamaños: small, medium, large
  // - Mensaje opcional
  // - Animación de spinner

  return (
    <div>
      <div>Loading...</div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Loading;
