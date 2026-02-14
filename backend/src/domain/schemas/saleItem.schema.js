const { z } = require('zod');

module.exports = z.object({
  productId: z.string().uuid(),
  productName: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
});
