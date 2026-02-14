import { z } from 'zod';

const InventorySchema = z.object({
  id: z.string().uuid().optional(),
  productId: z.string().uuid(),
  quantity: z.number().int().min(0),
  minStock: z.number().int().optional().nullable(),
});

export default InventorySchema;