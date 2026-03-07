import { z } from 'zod';
import ProductCategory from '../enum/ProductCategory.js';

/**
 * Convierte strings a números para validación
 * @param {unknown} val - Valor a convertir
 * @returns {number | unknown} - Número o valor original
 */
const toNumber = (val) => {
  if (typeof val === 'string' && val.trim() !== '') return Number(val);
  return val;
};

/**
 * Esquema de validación para productos
 * Define las reglas para crear o actualizar productos
 */
const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().positive(),
  category: z.enum(Object.values(ProductCategory)),
  size: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  active: z.boolean().optional(),
  initialStock: z.preprocess(toNumber, z.number().int().min(0).optional().default(0)),
  minStock: z.preprocess(toNumber, z.number().int().min(0).optional().nullable()),
});

export default ProductSchema;