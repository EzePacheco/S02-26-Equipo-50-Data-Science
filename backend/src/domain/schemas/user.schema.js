import { z } from 'zod';

/**
 * user.schema.js
 * Capa de dominio: Esquema de validación Zod para la entidad User
 * Define las reglas de validación para los datos de un usuario
 */

/**
 * Esquema de validación para usuarios
 * @typedef {Object} UserSchema
 * @property {string} [id] - Identificador único
 * @property {string} email - Correo electrónico válido
 * @property {string} name - Nombre del usuario
 * @property {Date} [createdAt] - Fecha de creación
 * @property {Date} [updatedAt] - Fecha de actualización
 */
const UserSchema = z.object({
  id: z.uuid().optional(),
  email: z.email({ error: 'Debe ser un correo electrónico válido' }),
  name: z.string().min(1, { error: 'El nombre es requerido' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default UserSchema;