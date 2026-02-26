import { z } from 'zod';
import SaleItemSchema from './saleItem.schema.js';

const SaleSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid('El ID del usuario debe ser un UUID válido'),
  customerId: z.string().uuid('El ID del cliente debe ser un UUID válido').optional().nullable(),
  items: z.array(SaleItemSchema).min(1, 'Debe incluir al menos un producto en la venta'),
  totalAmount: z.number().positive().optional(),
});

export default SaleSchema;
