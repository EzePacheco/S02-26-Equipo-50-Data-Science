// user.validator.js
// Capa de interfaz: Esquemas de validación de peticiones de Usuario

export const createUserSchema = {
  // TODO: Definir esquema Zod v4 para crear un usuario
  // email: z.string().email()
  // name: z.string().min(2)
};

export const updateUserSchema = {
  // TODO: Definir esquema Zod v4 para actualizar un usuario
  // email: z.string().email().optional()
  // name: z.string().min(2).optional()
};

export default {
  createUserSchema,
  updateUserSchema
};
