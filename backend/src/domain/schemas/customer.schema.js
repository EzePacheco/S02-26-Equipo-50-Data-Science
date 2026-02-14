const { z } = require('zod');

module.exports = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.date().optional(),
});
