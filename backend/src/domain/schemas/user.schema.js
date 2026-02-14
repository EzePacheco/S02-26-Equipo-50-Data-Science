const { z } = require('zod');

module.exports = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
