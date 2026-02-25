import { z } from 'zod';

const SaleItemSchema = z.object({
  productId: z.string().uuid('El ID del producto debe ser un UUID válido'),
  productName: z.string().min(1, 'El nombre del producto es requerido'),
  quantity: z.number().int().positive('La cantidad debe ser un número entero positivo'),
  unitPrice: z.number().positive('El precio unitario debe ser mayor a 0'),
});

export default SaleItemSchema;
