// store.schema.js
// Capa de dominio: Esquema de validación Zod para la entidad Store
// Define las reglas de validación para los datos de una tienda

import { z } from 'zod';

/**
 * Esquema de validación para Store
 * - id: UUID opcional (se genera automáticamente si no se proporciona)
 * - name: string requerido, mínimo 1 caracter
 * - category: enum con valores permitidos ROPA o CALZADO
 * - userId: UUID requerido (relación con User)
 * - createdAt/updatedAt: fechas opcionales (manejadas por la BD)
 */
const StoreSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'El nombre de la tienda es requerido'),
  category: z.enum(['ROPA', 'CALZADO'], {
    message: 'La categoría debe ser ROPA o CALZADO',
  }),
  userId: z.string().uuid('El ID de usuario debe ser un UUID válido'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default StoreSchema;
