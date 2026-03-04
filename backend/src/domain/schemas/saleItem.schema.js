import { z } from 'zod';

const toNumber = (v) => {
  if (typeof v === 'string' && v.trim() !== '') return Number(v);
  return v;
};

const SaleItemSchema = z.object({
  variantId: z.string().uuid('El ID de la variante debe ser un UUID válido'),
  productName: z.string().min(1, 'El nombre del producto es requerido'),
  quantity: z.preprocess(toNumber, z.number().int().positive('La cantidad debe ser un número entero positivo')),
  unitPrice: z.preprocess(toNumber, z.number().positive('El precio unitario debe ser mayor a 0')),
});

export default SaleItemSchema;
