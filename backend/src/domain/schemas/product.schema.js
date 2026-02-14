import { z } from 'zod';
import ProductCategory from '../enums/ProductCategory.js';

const ProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().positive(),
  category: z.enum(Object.values(ProductCategory)),
  active: z.boolean().optional(),
});

export default ProductSchema;