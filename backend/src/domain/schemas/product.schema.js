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
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().optional(),
  category: z.nativeEnum(ProductCategory),
  gender: z.string().optional(),
  style: z.string().optional(),
  active: z.boolean().optional().default(true),
  variants: z.array(ProductVariantSchema).min(1, 'Debe tener al menos una variante'),
});

export default ProductSchema;