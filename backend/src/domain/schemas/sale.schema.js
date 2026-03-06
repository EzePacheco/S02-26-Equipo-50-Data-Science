import { z } from 'zod';
import SaleItemSchema from './saleItem.schema.js';

/**
 * sale.schema.js
 * Capa de dominio: Esquema de validación Zod para la entidad Sale
 * Define las reglas de validación para los datos de una venta
 */

/**
 * Esquema de validación para ventas
 * @typedef {Object} SaleSchema
 * @property {string} [id] - Identificador único de la venta
 * @property {string} userId - ID del usuario que realiza la venta
 * @property {string} [customerId] - ID del cliente (opcional)
 * @property {import('./saleItem.schema.js').default} items - Lista de productos vendidos
 * @property {number} [totalAmount] - Monto total de la venta
 */
const SaleSchema = z.object({
  id: z.uuid().optional(),
  userId: z.uuid({ error: 'El ID del usuario debe ser un UUID válido' }),
  customerId: z.uuid({ error: 'El ID del cliente debe ser un UUID válido' }).optional().nullable(),
  items: z.array(SaleItemSchema).min(1, { error: 'Debe incluir al menos un producto en la venta' }),
  totalAmount: z.number().positive({ error: 'El monto debe ser mayor a 0' }).optional(),
});

export default SaleSchema;
