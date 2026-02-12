// product.validator.js
// Capa de interfaz: Esquemas de validación de peticiones de Producto

export const createProductSchema = {
  // TODO: Definir esquema Zod v4 para crear un producto
  // name: z.string().min(2)
  // sku: z.string()
  // price: z.number().positive()
  // category: z.enum(['ROPA', 'CALZADO'])
};

export const updateProductSchema = {
  // TODO: Definir esquema Zod v4 para actualizar un producto
};

export default {
  createProductSchema,
  updateProductSchema
};
