import { z } from 'zod';

/**
 * Convierte strings a números para validación
 * @param {unknown} v - Valor a convertir
 * @returns {number | unknown} - Número o valor original
 */
const toNumber = (v) => {
  if (typeof v === 'string' && v.trim() !== '') return Number(v);
  return v;
};

/**
 * Esquema de validación para items de venta
 * Define las reglas para los productos vendidos en una transacción
 */
const SaleItemSchema = z.object({
  productId: z.uuid({ error: 'El ID del producto debe ser un UUID válido' }),
  productName: z.string().min(1, { error: 'El nombre del producto es requerido' }),
  quantity: z.preprocess(toNumber, z.number().int().positive({ error: 'La cantidad debe ser un número entero positivo' })),
  unitPrice: z.preprocess(toNumber, z.number().positive({ error: 'El precio unitario debe ser mayor a 0' })),
});

export default SaleItemSchema;
