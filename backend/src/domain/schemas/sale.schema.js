import { z } from 'zod';
import saleItemSchema from './saleItem.schema.js';

const SaleSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  customerId: z.string().uuid().optional().nullable(),
  items: z.array(saleItemSchema).min(1),
});

export default SaleSchema;