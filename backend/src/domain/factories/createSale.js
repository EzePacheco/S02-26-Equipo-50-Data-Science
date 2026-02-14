import Sale from'../entities/Sale.js';
import SaleSchema from '../schemas/sale.schema.js';

export default (data) => {
  const validatedData = SaleSchema.parse(data);
  return new Sale(validatedData);
};
