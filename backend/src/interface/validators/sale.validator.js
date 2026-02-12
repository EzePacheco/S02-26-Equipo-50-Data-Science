// sale.validator.js
// Capa de interfaz: Esquemas de validación de peticiones de Venta

export const createSaleSchema = {
  // TODO: Definir esquema Zod v4 para crear una venta
  // userId: z.string().uuid()
  // customerId: z.string().uuid().optional()
  // items: z.array(z.object({
  //   productId: z.string().uuid(),
  //   quantity: z.number().int().positive()
  // })).min(1)
};

export const dateRangeSchema = {
  // TODO: Definir esquema Zod v4 para consulta de rango de fechas
  // startDate: z.string().datetime()
  // endDate: z.string().datetime()
};

export default {
  createSaleSchema,
  dateRangeSchema
};
