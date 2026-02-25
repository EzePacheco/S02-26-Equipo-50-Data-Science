import { z } from 'zod';

const variantSchema = z.object({
  sku: z.string().min(1, "El SKU es obligatorio"),
  size: z.string().min(1, "La talla es obligatoria"),
  color: z.string().optional(),
  price: z.number({
    required_error: "El precio es obligatorio",
    invalid_type_error: "El precio debe ser un número",
  }).positive("El precio debe ser mayor a 0"),
  stock: z.number({
    invalid_type_error: "El stock debe ser un número",
  }).int().nonnegative("El stock no puede ser negativo").default(0)
});

export const createProductSchema = z.object({
  name: z.string({
    required_error: "El nombre del producto es obligatorio",
  }).min(3, "El nombre debe tener al menos 3 caracteres"),
  
  description: z.string().optional(),
  category: z.string().optional(),
  gender: z.string().optional(),
  style: z.string().optional(),
  
  variants: z.array(variantSchema).min(1, "Debes agregar al menos una variante (talla/color) al producto")
});