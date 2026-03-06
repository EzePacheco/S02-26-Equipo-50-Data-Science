/**
 * store.schema.js
 * Capa de dominio: Esquema de validación Zod para la entidad Store
 * Define las reglas de validación para los datos de una tienda
 */

import { z } from 'zod';

/**
 * Esquema de validación para Store
 * - id: UUID opcional (Se genera automáticamente si no se proporciona)
 * - name: string requerido, mínimo 1 caracter
 * - category: enum con valores permitidos ROPA o CALZADO
 * - userId: UUID requerido (relación con User)
 * - createdAt/updatedAt: fechas opcionales (manejadas por la BD)
 * @typedef {Object} StoreSchema
 * @property {string} [id] - Identificador único
 * @property {string} name - Nombre de la tienda
 * @property {'ROPA' | 'CALZADO'} category - Categoría del negocio
 * @property {string} userId - ID del usuario propietario
 * @property {Date} [createdAt] - Fecha de creación
 * @property {Date} [updatedAt] - Fecha de actualización
 */
const StoreSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, { error: 'El nombre de la tienda es requerido' }),
  category: z.enum(['ROPA', 'CALZADO'], {
    error: 'La categoría debe ser ROPA o CALZADO',
  }),
  userId: z.uuid({ error: 'El ID de usuario debe ser un UUID válido' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default StoreSchema;
