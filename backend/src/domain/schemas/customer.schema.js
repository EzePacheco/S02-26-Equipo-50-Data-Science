import { z } from 'zod';

/**
 * customer.schema.js
 * Capa de dominio: Esquema de validación Zod para la entidad Customer
 * Define las reglas de validación para los datos de un cliente
 */

/**
 * Esquema de validación para clientes
 * @typedef {Object} CustomerSchema
 * @property {string} [id] - Identificador único
 * @property {string} name - Nombre del cliente
 * @property {string} [email] - Correo electrónico (opcional)
 * @property {string} [phone] - Teléfono de contacto (opcional)
 * @property {Date} [createdAt] - Fecha de creación
 */
const CustomerSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, { error: 'El nombre es requerido' }),
  email: z.email({ error: 'Debe ser un correo electrónico válido' }).optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.date().optional(),
});

export default CustomerSchema;
