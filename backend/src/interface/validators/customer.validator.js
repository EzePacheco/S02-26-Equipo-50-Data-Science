// customer.validator.js
// Capa de interfaz: Esquemas de validación de peticiones de Cliente

export const createCustomerSchema = {
  // TODO: Definir esquema Zod v4 para crear un cliente
  // name: z.string().min(2)
  // email: z.string().email().optional()
  // phone: z.string().regex(/^[0-9]+$/).optional()
};

export const updateCustomerSchema = {
  // TODO: Definir esquema Zod v4 para actualizar un cliente
};

export default {
  createCustomerSchema,
  updateCustomerSchema
};
