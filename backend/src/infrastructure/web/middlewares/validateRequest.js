// validateRequest.js
// Capa de infraestructura: Middleware de validación de peticiones

const validateRequest = (schema) => {
  // TODO: Implementar middleware de validación
  // Aceptar un esquema Zod v4
  // Usar schema.safeParse() o schema.parse() para validar req.body, req.params, req.query
  // Retornar 400 si la validación falla con los errores de Zod
  return (req, res, next) => {
    next();
  };
};

export default validateRequest;
