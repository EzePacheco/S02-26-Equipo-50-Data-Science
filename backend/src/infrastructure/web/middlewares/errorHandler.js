// errorHandler.js
// Capa de infraestructura: Middleware global de manejo de errores

const errorHandler = (err, req, res, next) => {
  // TODO: Implementar lógica de manejo de errores
  // 1. Registrar detalles del error
  // 2. Verificar tipo de error (DomainError, ValidationError, etc.)
  // 3. Retornar código de estado y mensaje apropiados
  // 4. No filtrar stack traces en producción
};

export default errorHandler;
