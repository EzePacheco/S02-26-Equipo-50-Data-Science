import { z } from 'zod';
import ProductCategory from '../enum/ProductCategory.js';


const toNumber = (val) => {
  if (typeof val === 'string' && val.trim() !== '') return Number(val);
  return val;
};

const ProductVariantSchema = z.object({
  id: z.string().uuid().optional(),
  sku: z.preprocess((v) => (typeof v === 'string' ? v.trim().toUpperCase() : v), z.string().min(3, 'El SKU debe tener al menos 3 caracteres')),
  size: z.string().min(1, 'La talla es obligatoria'),
  color: z.string().optional(),
  price: z.preprocess(toNumber, z.number().positive('El precio debe ser mayor a 0')),
  stock: z.preprocess(toNumber, z.number().int().nonnegative().default(0)),
  minStock: z.preprocess(toNumber, z.number().int().nonnegative().optional()),
});

const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().positive(),
  category: z.enum(Object.values(ProductCategory)),
  size: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  active: z.boolean().optional(),
});

export default ProductSchema;