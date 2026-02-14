const { z } = require('zod');
const  saleItemSchema = require('./saleItem.schema');

module.exports = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  customerId: z.string().uuid().optional().nullable(),
  items: z.array(saleItemSchema).min(1),
});
