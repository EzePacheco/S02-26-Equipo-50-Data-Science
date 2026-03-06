import { z } from 'zod';

/**
 * inventory.schema.js
 * Capa de dominio: Esquema de validación Zod para la entidad Inventory
 * Define las reglas de validación para los datos de inventario
 */

/**
 * Esquema de validación para inventario
 * @typedef {Object} InventorySchema
 * @property {string} [id] - Identificador único del inventario
 * @property {string} productId - ID del producto relacionado
 * @property {number} quantity - Cantidad en stock
 * @property {number} [minStock] - Stock mínimo para alertas (opcional)
 */
const InventorySchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  quantity: z.number().int().min(0),
  minStock: z.number().int().optional().nullable(),
});

export default InventorySchema;