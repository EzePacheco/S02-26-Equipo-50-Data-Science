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
 * Esquema de validación para variantes de producto
 * Cada producto puede tener múltiples variantes (talla, color, etc.)
 */
const ProductVariantSchema = z.object({
  id: z.string().uuid().optional(),
  sku: z.preprocess((v) => (typeof v === 'string' ? v.trim().toUpperCase() : v), z.string().min(3, { error: 'El SKU debe tener al menos 3 caracteres' })),
  size: z.string().min(1, { error: 'La talla es obligatoria' }),
  color: z.string().optional(),
  price: z.preprocess(toNumber, z.number().positive({ error: 'El precio debe ser mayor a 0' })),
  stock: z.preprocess(toNumber, z.number().int().min(0).default(0)),
  minStock: z.preprocess(toNumber, z.number().int().min(0).optional()),
});

/**
 * Esquema de validación para productos
 * Define las reglas para crear o actualizar productos
 */
const ProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { error: 'El nombre es obligatorio' }),
  description: z.string().optional(),
  category: z.enum(ProductCategory),
  gender: z.string().optional(),
  style: z.string().optional(),
  active: z.boolean().optional().default(true),
  variants: z.array(ProductVariantSchema).min(1, { error: 'Debe tener al menos una variante' }),
});

export default ProductSchema;